import { getDefaultImageFileList } from "@/entities/form/helpers/form";
import { ImageFormItem } from "@/entities/form/ui/image-form-item/ImageFormItem";
import { Button, Form, Input } from "antd"
import { FC, useState } from "react"
type TMintFormProps = {
    onSubmit: (values: any) => void;
    disabled: boolean;
}
export const MintForm: FC<TMintFormProps> = ({ onSubmit, disabled }) => {
    const [isFormChanged, setIsFormChanged] = useState(false)
    const handleFormChange = () => {
        setIsFormChanged(true)
    }
    return (
        <Form
            onFinish={onSubmit}
            disabled={disabled}
        >
            <Form.Item label={'Name'} className="" name={'name'}>
                <Input placeholder={"Enter your NFT name"} disabled={false} />
            </Form.Item>
            <Form.Item label={'Description'} className="" name={'description'}>
                <Input placeholder={"Enter your NFT name description"} disabled={false} />
            </Form.Item>
            <ImageFormItem
                name="image"
                label="Image"
                handleFormChange={handleFormChange}
            />
            <Button htmlType="submit" type="primary" disabled={!isFormChanged}>Submit</Button>
        </Form>
    )
}