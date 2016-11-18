'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var message_types_1 = require("./message-types");
var MessengerTemplate = (function () {
    function MessengerTemplate() {
    }
    return MessengerTemplate;
}());
exports.MessengerTemplate = MessengerTemplate;
var MessageAttachment = (function () {
    function MessageAttachment(template, type) {
        if (type === void 0) { type = message_types_1.AttachmentType.TEMPLATE; }
        this.template = template;
        this.type = type;
    }
    MessageAttachment.prototype.build = function () {
        return {
            attachment: {
                type: message_types_1.getAttachmentTypeString(this.type),
                payload: this.template.build()
            }
        };
    };
    return MessageAttachment;
}());
exports.MessageAttachment = MessageAttachment;
var ListTemplate = (function (_super) {
    __extends(ListTemplate, _super);
    function ListTemplate(elements, topElementStyle) {
        if (topElementStyle === void 0) { topElementStyle = message_types_1.TopElementStyle.COMPACT; }
        _super.call(this);
        this.elements = elements;
        this.topElementStyle = topElementStyle;
    }
    ListTemplate.prototype.build = function () {
        return {
            template_type: 'list',
            top_element_style: message_types_1.getTopElementStyleString(this.topElementStyle),
            elements: this.elements.map(function (element) { return element.build(); }),
        };
    };
    return ListTemplate;
}(MessengerTemplate));
exports.ListTemplate = ListTemplate;
var ListElement = (function () {
    function ListElement(title, subtitle, imageUrl, defaultAction, buttons) {
        this.title = title;
        this.subtitle = subtitle;
        this.imageUrl = imageUrl;
        this.defaultAction = defaultAction;
        this.buttons = buttons;
    }
    ListElement.prototype.build = function () {
        var result = {
            title: this.title,
            subtitle: this.subtitle,
            image_url: this.imageUrl,
        };
        if (this.defaultAction)
            result['default_action'] = this.defaultAction.build();
        if (this.buttons && this.buttons.length === 1)
            result['buttons'] = this.buttons.map(function (button) { return button.build(); });
        return result;
    };
    return ListElement;
}());
exports.ListElement = ListElement;
var Button = (function () {
    function Button(title) {
        this.title = title;
    }
    return Button;
}());
exports.Button = Button;
var MessengerAction = (function () {
    function MessengerAction(url, messengerExtensions, webviewHeightRatio, fallbackUrl) {
        if (messengerExtensions === void 0) { messengerExtensions = true; }
        if (webviewHeightRatio === void 0) { webviewHeightRatio = message_types_1.WebviewHeightRatio.FULL; }
        if (fallbackUrl === void 0) { fallbackUrl = url; }
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
    MessengerAction.prototype.build = function () {
        return {
            type: message_types_1.getButtonTypeString(this.type),
            url: this.url,
            messenger_extensions: this.messengerExtensions,
            webview_height_ratio: message_types_1.getWebviewHeightRatioString(this.webviewHeightRatio),
            fallback_url: this.fallbackUrl,
        };
    };
    return MessengerAction;
}());
exports.MessengerAction = MessengerAction;
var WebUrlButton = (function (_super) {
    __extends(WebUrlButton, _super);
    function WebUrlButton(title, url, messengerExtensions, webviewHeightRatio, fallbackUrl) {
        if (messengerExtensions === void 0) { messengerExtensions = true; }
        if (webviewHeightRatio === void 0) { webviewHeightRatio = message_types_1.WebviewHeightRatio.FULL; }
        if (fallbackUrl === void 0) { fallbackUrl = url; }
        _super.call(this, title);
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
    WebUrlButton.prototype.build = function () {
        return {
            type: message_types_1.getButtonTypeString(this.type),
            title: this.title,
            url: this.url,
            messenger_extensions: this.messengerExtensions,
            webview_height_ratio: message_types_1.getWebviewHeightRatioString(this.webviewHeightRatio),
            fallback_url: this.fallbackUrl,
        };
    };
    return WebUrlButton;
}(Button));
exports.WebUrlButton = WebUrlButton;
var PostbackButton = (function (_super) {
    __extends(PostbackButton, _super);
    function PostbackButton(title, payload) {
        _super.call(this, title);
        this.type = message_types_1.ButtonType.POSTBACK;
        this.payload = payload;
    }
    PostbackButton.prototype.build = function () {
        return {
            title: this.title,
            type: message_types_1.getButtonTypeString(this.type),
            payload: this.payload.build()
        };
    };
    return PostbackButton;
}(Button));
exports.PostbackButton = PostbackButton;
var ShowMovieRatingPostbackPayload = (function () {
    function ShowMovieRatingPostbackPayload(imdbId) {
        this.type = message_types_1.PostbackType.SHOW_MOVIE_RATING;
        this.imdbId = imdbId;
    }
    ShowMovieRatingPostbackPayload.prototype.build = function () {
        var result = {
            type: message_types_1.getPostbackTypeString(this.type),
            imdbId: this.imdbId
        };
        return JSON.stringify(result);
    };
    return ShowMovieRatingPostbackPayload;
}());
exports.ShowMovieRatingPostbackPayload = ShowMovieRatingPostbackPayload;
