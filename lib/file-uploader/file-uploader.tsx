import * as React from "react";
import Dropzone from "react-dropzone";
import { LocaleContext } from "../locale";
import { useStyletron } from "../styles";
import { Button, KIND, SHAPE, SIZE as BUTTON_SIZE } from "../button";
import { getOverrides } from "../helpers/overrides";
import { ProgressBar } from "../progress-bar";
import { Spinner, SIZE as SPINNER_SIZE } from "../spinner";
import {
  StyledRoot,
  StyledFileDragAndDrop,
  StyledContentMessage,
  StyledContentSeparator,
  StyledErrorMessage,
  StyledHiddenInput,
} from "./styled-components";
function prependStyleProps(styleProps) {
  return Object.keys(styleProps).reduce((nextStyleProps, currentKey) => {
    nextStyleProps[`$${currentKey}`] = styleProps[currentKey];
    return nextStyleProps;
  }, {});
}
function FileUploader(props) {
  const { overrides = {} } = props;
  const [, theme] = useStyletron();
  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
  const [FileDragAndDrop, fileDragAndDropProps] = getOverrides(
    overrides.FileDragAndDrop,
    StyledFileDragAndDrop
  );
  const [ContentMessage, contentMessageProps] = getOverrides(
    overrides.ContentMessage,
    StyledContentMessage
  );
  const [ContentSeparator, contentSeparatorProps] = getOverrides(
    overrides.ContentSeparator,
    StyledContentSeparator
  );
  const [ErrorMessage, errorMessageProps] = getOverrides(
    overrides.ErrorMessage,
    StyledErrorMessage
  );
  const [HiddenInput, hiddenInputProps] = getOverrides(
    overrides.HiddenInput,
    StyledHiddenInput
  );
  const [ButtonComponent, buttonProps] = getOverrides(overrides.ButtonComponent, Button);
  const [SpinnerComponent, spinnerProps] = getOverrides(overrides.Spinner, Spinner);
  const afterFileDrop = !!(
    props.progressAmount ||
    props.progressMessage ||
    props.errorMessage
  );
  return (
    <Dropzone {...props} disabled={props.disabled || afterFileDrop}>
      {(renderProps) => {
        const { getRootProps, getInputProps, open, ...styleProps } = renderProps;
        const prefixedStyledProps = prependStyleProps({
          ...styleProps,
          isDisabled: props.disabled,
          afterFileDrop,
        });
        const getRootPropsArgs = {
          ...(props.disableClick
            ? {
                onClick: (evt) => {
                  return evt.preventDefault();
                },
              }
            : {}),
          tabIndex: "-1",
        };
        return (
          <LocaleContext.Consumer>
            {(locale) => {
              return (
                <Root
                  data-baseweb="file-uploader"
                  {...prefixedStyledProps}
                  {...rootProps}
                >
                  <FileDragAndDrop
                    {...getRootProps(getRootPropsArgs)}
                    {...prefixedStyledProps}
                    {...fileDragAndDropProps}
                  >
                    {!afterFileDrop && (
                      <React.Fragment>
                        <ContentMessage {...prefixedStyledProps} {...contentMessageProps}>
                          {locale.fileuploader.dropFilesToUpload}
                        </ContentMessage>
                        <ContentSeparator
                          {...prefixedStyledProps}
                          {...contentSeparatorProps}
                        >
                          {locale.fileuploader.or}
                        </ContentSeparator>
                        <ButtonComponent
                          disabled={props.disabled}
                          kind={KIND.secondary}
                          shape={SHAPE.pill}
                          size={BUTTON_SIZE.compact}
                          onClick={open}
                          role="button"
                          overrides={{
                            BaseButton: {
                              style: ({ $theme }) => {
                                return {
                                  marginTop: $theme.sizing.scale500,
                                };
                              },
                            },
                          }}
                          {...prefixedStyledProps}
                          {...buttonProps}
                        >
                          {locale.fileuploader.browseFiles}
                        </ButtonComponent>
                      </React.Fragment>
                    )}
                    {afterFileDrop && (
                      <React.Fragment>
                        {typeof props.progressAmount === "number" ? (
                          <ProgressBar
                            value={props.progressAmount}
                            overrides={{
                              BarProgress: {
                                style: ({ $theme }) => {
                                  return {
                                    backgroundColor: props.errorMessage
                                      ? $theme.colors.negative
                                      : $theme.colors.accent,
                                  };
                                },
                              },
                            }}
                          />
                        ) : props.errorMessage ? null : (
                          <SpinnerComponent
                            $size={SPINNER_SIZE.medium}
                            $style={{ marginBottom: theme.sizing.scale300 }}
                            {...spinnerProps}
                          />
                        )}
                        {(props.errorMessage || props.progressMessage) &&
                        props.errorMessage ? (
                          <ErrorMessage {...prefixedStyledProps} {...errorMessageProps}>
                            {props.errorMessage}
                          </ErrorMessage>
                        ) : (
                          <ContentMessage
                            {...prefixedStyledProps}
                            {...contentMessageProps}
                          >
                            {props.progressMessage}
                          </ContentMessage>
                        )}
                        {props.errorMessage ? (
                          <ButtonComponent
                            kind={KIND.tertiary}
                            onClick={() => {
                              props.onRetry && props.onRetry();
                            }}
                            aria-invalid={Boolean(props.errorMessage)}
                            aria-describedby={props["aria-describedby"]}
                            aria-errormessage={props.errorMessage}
                          >
                            {locale.fileuploader.retry}
                          </ButtonComponent>
                        ) : (
                          <ButtonComponent
                            kind={KIND.tertiary}
                            onClick={() => {
                              props.onCancel && props.onCancel();
                            }}
                            aria-describedby={props["aria-describedby"]}
                            overrides={{
                              BaseButton: {
                                style: ({ $theme }) => {
                                  return {
                                    color: $theme.colors.contentNegative,
                                  };
                                },
                              },
                            }}
                          >
                            {locale.fileuploader.cancel}
                          </ButtonComponent>
                        )}
                      </React.Fragment>
                    )}
                  </FileDragAndDrop>
                  <HiddenInput
                    aria-invalid={Boolean(props.errorMessage) || null}
                    aria-describedby={props["aria-describedby"]}
                    aria-errormessage={props.errorMessage || null}
                    {...getInputProps()}
                    {...prefixedStyledProps}
                    {...hiddenInputProps}
                  />
                </Root>
              );
            }}
          </LocaleContext.Consumer>
        );
      }}
    </Dropzone>
  );
}
FileUploader.defaultProps = {
  disableClick: true,
  overrides: {},
};
export default FileUploader;
