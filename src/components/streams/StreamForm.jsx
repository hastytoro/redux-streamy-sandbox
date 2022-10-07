import React from "react";
import { Field, reduxForm } from "redux-form";

const StreamForm = (props) => {
  const renderError = ({ error, touched }) => {
    if (touched && error)
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
  };
  const renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input autoComplete="off" {...input} />
        {renderError(meta)}
      </div>
    );
  };
  const onSubmit = (formValues) => {
    props.onSubmit(formValues);
  };
  return (
    <form className="ui form error" onSubmit={props.handleSubmit(onSubmit)}>
      <Field name="title" label="Your Title" component={renderInput} />
      <Field name="description" label="Description" component={renderInput} />
      <button className="ui button">Submit</button>
    </form>
  );
};

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) errors.title = "Enter a title";
  if (!formValues.description) errors.description = "Enter a description";
  return errors;
};

export default reduxForm({
  form: "streamForm",
  validate,
})(StreamForm);
