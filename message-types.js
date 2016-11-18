'use strict';
(function (PostbackType) {
    PostbackType[PostbackType["SHOW_MOVIE_RATING"] = 0] = "SHOW_MOVIE_RATING";
})(exports.PostbackType || (exports.PostbackType = {}));
var PostbackType = exports.PostbackType;
(function (ButtonType) {
    ButtonType[ButtonType["WEB_URL"] = 0] = "WEB_URL";
    ButtonType[ButtonType["POSTBACK"] = 1] = "POSTBACK";
})(exports.ButtonType || (exports.ButtonType = {}));
var ButtonType = exports.ButtonType;
(function (WebviewHeightRatio) {
    WebviewHeightRatio[WebviewHeightRatio["COMPACT"] = 0] = "COMPACT";
    WebviewHeightRatio[WebviewHeightRatio["TALL"] = 1] = "TALL";
    WebviewHeightRatio[WebviewHeightRatio["FULL"] = 2] = "FULL";
})(exports.WebviewHeightRatio || (exports.WebviewHeightRatio = {}));
var WebviewHeightRatio = exports.WebviewHeightRatio;
(function (TopElementStyle) {
    TopElementStyle[TopElementStyle["COMPACT"] = 0] = "COMPACT";
    TopElementStyle[TopElementStyle["LARGE"] = 1] = "LARGE";
})(exports.TopElementStyle || (exports.TopElementStyle = {}));
var TopElementStyle = exports.TopElementStyle;
(function (AttachmentType) {
    AttachmentType[AttachmentType["TEMPLATE"] = 0] = "TEMPLATE";
})(exports.AttachmentType || (exports.AttachmentType = {}));
var AttachmentType = exports.AttachmentType;
exports.getPostbackTypeString = function (postbackTypeEnum) {
    switch (postbackTypeEnum) {
        case PostbackType.SHOW_MOVIE_RATING:
            return 'SHOW_MOVIE_RATING';
    }
};
exports.getWebviewHeightRatioString = function (webviewHeightRatioEnum) {
    switch (webviewHeightRatioEnum) {
        case WebviewHeightRatio.COMPACT:
            return 'compact';
        case WebviewHeightRatio.TALL:
            return 'tall';
        case WebviewHeightRatio.FULL:
            return 'full';
    }
};
exports.getButtonTypeString = function (buttonTypeEnum) {
    switch (buttonTypeEnum) {
        case ButtonType.WEB_URL:
            return 'web_url';
        case ButtonType.POSTBACK:
            return 'postback';
    }
};
exports.getTopElementStyleString = function (topElementStyleEnum) {
    switch (topElementStyleEnum) {
        case TopElementStyle.COMPACT:
            return 'compact';
        case TopElementStyle.LARGE:
            return 'large';
    }
};
exports.getAttachmentTypeString = function (attachmentTypeEnum) {
    switch (attachmentTypeEnum) {
        case AttachmentType.TEMPLATE:
            return 'template';
    }
};
