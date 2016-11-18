'use strict';
import {
    getPostbackTypeString, PostbackType, getButtonTypeString, ButtonType,
    getWebviewHeightRatioString, WebviewHeightRatio, TopElementStyle, getTopElementStyleString, AttachmentType,
    getAttachmentTypeString
} from "./message-types";

export interface MessengerModel {
    build();
}

export abstract class MessengerTemplate implements MessengerModel {

    abstract build();
}

export class MessageAttachment implements MessengerModel {
    template: MessengerTemplate;
    type: AttachmentType;


    constructor(template: MessengerTemplate, type: AttachmentType = AttachmentType.TEMPLATE) {
        this.template = template;
        this.type = type;
    }


    build() {
        return {
            attachment: {
                type: getAttachmentTypeString(this.type),
                payload: this.template.build()
            }
        }
    }
}

export class ListTemplate extends MessengerTemplate implements MessengerModel {
    elements: Array<ListElement>;
    topElementStyle: TopElementStyle;

    constructor(elements: Array<ListElement>, topElementStyle: TopElementStyle = TopElementStyle.COMPACT) {
        super();
        this.elements = elements;
        this.topElementStyle = topElementStyle;
    }


    build() {
        return {
            template_type: 'list',
            top_element_style: getTopElementStyleString(this.topElementStyle),
            elements: this.elements.map((element: ListElement) => element.build()),
        }
    }
}

export class ListElement implements MessengerModel {
    title: string;
    subtitle: string;
    imageUrl: string;
    defaultAction: MessengerAction;
    buttons: Array<any>;

    constructor(title: string,
                subtitle: string,
                imageUrl: string,
                defaultAction?: MessengerAction,
                buttons?: Array<Button>) {
        this.title = title;
        this.subtitle = subtitle;
        this.imageUrl = imageUrl;
        this.defaultAction = defaultAction;
        this.buttons = buttons;
    }


    build() {
        const result = {
            title: this.title,
            subtitle: this.subtitle,
            image_url: this.imageUrl,
        };
        if (this.defaultAction) result['default_action'] = this.defaultAction.build();
        if (this.buttons && this.buttons.length === 1) result['buttons'] = this.buttons.map((button: Button) => button.build());
        return result;
    }
}

export abstract class Button {
    title: string;
    type: ButtonType;

    constructor(title: string) {
        this.title = title;
    }

    abstract build();
}


export class MessengerAction implements MessengerModel {
    readonly type: ButtonType = ButtonType.WEB_URL;
    url: string;
    messengerExtensions: boolean;
    webviewHeightRatio: WebviewHeightRatio;
    fallbackUrl: string;

    constructor(url: string,
                messengerExtensions: boolean = true,
                webviewHeightRatio: WebviewHeightRatio = WebviewHeightRatio.FULL,
                fallbackUrl: string = url) {
        if (messengerExtensions) {
            this.url = url.replace('http://', 'https://');
        } else {
            this.url = url;
        }
        this.messengerExtensions = messengerExtensions;
        this.webviewHeightRatio = webviewHeightRatio;
        this.fallbackUrl = fallbackUrl;
    }

    build() {
        return {
            type: getButtonTypeString(this.type),
            url: this.url,
            messenger_extensions: this.messengerExtensions,
            webview_height_ratio: getWebviewHeightRatioString(this.webviewHeightRatio),
            fallback_url: this.fallbackUrl,
        }
    }
}

export class WebUrlButton extends Button {
    url: string;
    messengerExtensions: boolean;
    webviewHeightRatio: WebviewHeightRatio;
    fallbackUrl: string;


    constructor(title: string,
                url: string,
                messengerExtensions: boolean = true,
                webviewHeightRatio: WebviewHeightRatio = WebviewHeightRatio.FULL,
                fallbackUrl: string = url) {
        super(title);
        this.type = ButtonType.WEB_URL;
        if (messengerExtensions) {
            this.url = url.replace('http://', 'https://');
        } else {
            this.url = url;
        }
        this.messengerExtensions = messengerExtensions;

        this.webviewHeightRatio = webviewHeightRatio;
        this.fallbackUrl = fallbackUrl;
    }


    build() {
        return {
            type: getButtonTypeString(this.type),
            title: this.title,
            url: this.url,
            messenger_extensions: this.messengerExtensions,
            webview_height_ratio: getWebviewHeightRatioString(this.webviewHeightRatio),
            fallback_url: this.fallbackUrl,
        }
    }
}

export class PostbackButton extends Button implements MessengerModel {
    readonly type: ButtonType = ButtonType.POSTBACK;
    payload: ShowMovieRatingPostbackPayload;


    constructor(title: string, payload: ShowMovieRatingPostbackPayload) {
        super(title);
        this.payload = payload;
    }


    build() {
        return {
            title: this.title,
            type: getButtonTypeString(this.type),
            payload: this.payload.build()
        }
    }
}

export class ShowMovieRatingPostbackPayload implements MessengerModel {
    readonly type: PostbackType = PostbackType.SHOW_MOVIE_RATING;
    imdbId: string;


    constructor(imdbId: string) {
        this.imdbId = imdbId;
    }


    build(): string {
        const result = {
            type: getPostbackTypeString(this.type),
            imdbId: this.imdbId
        };
        return JSON.stringify(result);
    }
}
