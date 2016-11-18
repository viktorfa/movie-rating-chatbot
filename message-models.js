'use strict';
const message_types_1 = require("./message-types");
class MessengerTemplate {
}
exports.MessengerTemplate = MessengerTemplate;
class MessageAttachment {
    constructor(template, type = message_types_1.AttachmentType.TEMPLATE) {
        this.template = template;
        this.type = type;
    }
    build() {
        return {
            attachment: {
                type: message_types_1.getAttachmentTypeString(this.type),
                payload: this.template.build()
            }
        };
    }
}
exports.MessageAttachment = MessageAttachment;
class ListTemplate extends MessengerTemplate {
    constructor(elements, topElementStyle = message_types_1.TopElementStyle.COMPACT) {
        super();
        this.elements = elements;
        this.topElementStyle = topElementStyle;
    }
    build() {
        return {
            template_type: 'list',
            top_element_style: message_types_1.getTopElementStyleString(this.topElementStyle),
            elements: this.elements.map((element) => element.build()),
        };
    }
}
exports.ListTemplate = ListTemplate;
class ListElement {
    constructor(title, subtitle, imageUrl, defaultAction, buttons) {
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
        if (this.defaultAction)
            result['default_action'] = this.defaultAction.build();
        if (this.buttons && this.buttons.length === 1)
            result['buttons'] = this.buttons.map((button) => button.build());
        return result;
    }
}
exports.ListElement = ListElement;
class Button {
    constructor(title) {
        this.title = title;
    }
}
exports.Button = Button;
class MessengerAction {
    constructor(url, messengerExtensions = true, webviewHeightRatio = message_types_1.WebviewHeightRatio.FULL, fallbackUrl = url) {
        this.type = message_types_1.ButtonType.WEB_URL;
        if (messengerExtensions) {
            this.url = url.replace('http://', 'https://');
        }
        else {
            this.url = url;
        }
        this.messengerExtensions = messengerExtensions;
        this.webviewHeightRatio = webviewHeightRatio;
        this.fallbackUrl = fallbackUrl;
    }
    build() {
        return {
            type: message_types_1.getButtonTypeString(this.type),
            url: this.url,
            messenger_extensions: this.messengerExtensions,
            webview_height_ratio: message_types_1.getWebviewHeightRatioString(this.webviewHeightRatio),
            fallback_url: this.fallbackUrl,
        };
    }
}
exports.MessengerAction = MessengerAction;
class WebUrlButton extends Button {
    constructor(title, url, messengerExtensions = true, webviewHeightRatio = message_types_1.WebviewHeightRatio.FULL, fallbackUrl = url) {
        super(title);
        this.type = message_types_1.ButtonType.WEB_URL;
        if (messengerExtensions) {
            this.url = url.replace('http://', 'https://');
        }
        else {
            this.url = url;
        }
        this.messengerExtensions = messengerExtensions;
        this.webviewHeightRatio = webviewHeightRatio;
        this.fallbackUrl = fallbackUrl;
    }
    build() {
        return {
            type: message_types_1.getButtonTypeString(this.type),
            title: this.title,
            url: this.url,
            messenger_extensions: this.messengerExtensions,
            webview_height_ratio: message_types_1.getWebviewHeightRatioString(this.webviewHeightRatio),
            fallback_url: this.fallbackUrl,
        };
    }
}
exports.WebUrlButton = WebUrlButton;
class PostbackButton extends Button {
    constructor(title, payload) {
        super(title);
        this.type = message_types_1.ButtonType.POSTBACK;
        this.payload = payload;
    }
    build() {
        return {
            title: this.title,
            type: message_types_1.getButtonTypeString(this.type),
            payload: this.payload.build()
        };
    }
}
exports.PostbackButton = PostbackButton;
class ShowMovieRatingPostbackPayload {
    constructor(imdbId) {
        this.type = message_types_1.PostbackType.SHOW_MOVIE_RATING;
        this.imdbId = imdbId;
    }
    build() {
        const result = {
            type: message_types_1.getPostbackTypeString(this.type),
            imdbId: this.imdbId
        };
        return JSON.stringify(result);
    }
}
exports.ShowMovieRatingPostbackPayload = ShowMovieRatingPostbackPayload;
