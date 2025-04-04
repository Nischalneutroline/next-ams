export type FormSchema = {
  form: {
    register: any;
    errors: any;
    reset?: any;
    control?: any;
    handleSubmit?: any;
    onSubmit?: any;
  };
};

export type FormActionsSchema = {
  actions?: {
    handleClick: any;
    handleKeyUp: any;
    handleKeyDown: any;
    handleOnChange: any;
  };
};

export type CommonInputSchema = {
  common: {
    input: string;
    label?: string;
    defaultValue?: any;
    placeholder?: string;
    showForgotPassword?: boolean;
    showImportant?: boolean;
    icon?: any;
    restCommon?: any;
    handleOnChange?: any;
  };
};

export type ErrorMsgSchema = { errorMsg?: string };

export interface InputSchema
  extends CssSchema,
    ErrorMsgSchema,
    FormSchema,
    FormActionsSchema,
    CommonInputSchema {}

export type CssSchema = {
  css: {
    customCss?: string;
    divCss?: string;
    labelCss?: string;
    iconCss?: string;
    inputCss?: string;
    errorCss?: string;
    colorCss?: string;
    imgCss?: string;
  };
};
