'use strict';

export enum PostbackType {
    SHOW_MOVIE_RATING
}

export enum ButtonType {
    WEB_URL,
    POSTBACK
}

export enum WebviewHeightRatio {
    COMPACT,
    TALL,
    FULL
}

export enum TopElementStyle {
    COMPACT,
    LARGE
}

export enum AttachmentType {
    TEMPLATE
}

export const getPostbackTypeString = (postbackTypeEnum: PostbackType) => {
    switch (postbackTypeEnum) {
        case PostbackType.SHOW_MOVIE_RATING:
            return 'SHOW_MOVIE_RATING';
    }
};

export const getWebviewHeightRatioString = (webviewHeightRatioEnum: WebviewHeightRatio): string => {
    switch (webviewHeightRatioEnum) {
        case WebviewHeightRatio.COMPACT:
            return 'compact';
        case WebviewHeightRatio.TALL:
            return 'tall';
        case WebviewHeightRatio.FULL:
            return 'full';
    }
};

export const getButtonTypeString = (buttonTypeEnum: ButtonType): string => {
    switch (buttonTypeEnum) {
        case ButtonType.WEB_URL:
            return 'web_url';
        case ButtonType.POSTBACK:
            return 'postback';
    }
};

export const getTopElementStyleString = (topElementStyleEnum: TopElementStyle): string => {
    switch (topElementStyleEnum) {
        case TopElementStyle.COMPACT:
            return 'compact';
        case TopElementStyle.LARGE:
            return 'large';
    }
};

export const getAttachmentTypeString = (attachmentTypeEnum: AttachmentType) => {
    switch (attachmentTypeEnum) {
        case AttachmentType.TEMPLATE:
            return 'template';
    }
};
