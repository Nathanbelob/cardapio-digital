import React from "react";
import { toast as rToast } from "react-toastify";
import LeadToast from "Components/Composition/Toasts/LeadToast";

class Notification {
    toast(type, message, bundle = {}) {
        switch (type) {
            case `success`:
                rToast.success(message);
                break;
            case `error`:
                rToast.error(message);
                break;
            case `lead`:
                rToast.info(
                    <LeadToast message={message} user_id={bundle.user_id} />,
                    {
                        autoClose: false,
                    }
                );
                break;
            default:
                rToast.info(message);
                break;
        }
    }
}

export default new Notification();
