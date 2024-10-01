"use client"
import { ButtonWithCheckNetwork } from "@/shared/ui/ButtonWithCheckNetwork";
import { Form, Input, InputNumber } from "antd"
import FormItem from "antd/es/form/FormItem"
import { memo } from "react";
import { useAccount } from "wagmi";

type TDepositFormProps = {
    onSubmit: (values: any) => void;
    suffix?: string;
    min?: string;
    max?: string;
    loading: boolean;
    disabled: boolean;
    inputDisabled: boolean;
    buttonTitle: string | undefined;
}

export const WriteForm = memo(({ onSubmit, suffix, max, min, loading, disabled, inputDisabled, buttonTitle }: TDepositFormProps) => {
    const { isConnected } = useAccount()

    return (
        <Form
            onFinish={onSubmit}
            disabled={disabled}
        >
            <div className="flex flex-col">
                <FormItem
                    name='inputValue'
                    validateStatus="success"
                    validateTrigger="onBlur"
                >
                    <Input />
                </FormItem>
                <ButtonWithCheckNetwork
                    network="base"
                    htmlType="submit"
                    loading={loading}
                    type="primary"
                >
                    {buttonTitle || "Submit"}
                </ButtonWithCheckNetwork>
            </div>
        </Form>
    )
})

WriteForm.displayName = "WriteForm"