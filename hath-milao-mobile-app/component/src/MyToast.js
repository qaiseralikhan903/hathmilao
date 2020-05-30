import { Toast } from "native-base";

const SuccessToast = message => {
  return Toast.show({
    text: message,
    buttonText: "Okay",
    duration: 3000,
    type: "success"
  });
};

const DangerToast = message => {
  return Toast.show({
    text: message,
    buttonText: "Okay",
    duration: 3000,
    type: "danger"
  });
};

export { SuccessToast, DangerToast };
