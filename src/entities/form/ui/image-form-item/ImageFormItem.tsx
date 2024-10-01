"use client";

import { imageApi } from "@/app/_api/servises/imageApi";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Image, message, Upload, UploadProps } from "antd";
import { RcFile } from "antd/es/upload";
import { UploadFileStatus } from "antd/es/upload/interface";
import { UploadFile } from "antd/lib/upload";
import { FC, useEffect, useState } from "react";

type TUploadFormProps = {
    name: string,
    label: string,
    multiple?: boolean,
    defaultFileList?: UploadFile[] | undefined,
    handleFormChange: () => void,
    max?: number,
}

const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    if (e?.fileList && e?.fileList.length > 0) {
        const fileList = e?.fileList as UploadFile<any>[];
        return fileList.map(f => f.response || "");
    }
    return
};

export const ImageFormItem: FC<TUploadFormProps> = ({ name, label, defaultFileList, handleFormChange, multiple=false, max=1 }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewImage, setPreviewImage] = useState('');
    const [previewOpen, setPreviewOpen] = useState(false);

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        handleFormChange();
    }

    const handleFileRemove = (file: UploadFile) => {
        console.log("handleFileRemove", file);
        setFileList((prevFileList) => {
            const updatedFileList = prevFileList.filter((f) => f.uid !== file.uid);
            return updatedFileList;
        });
    };

    const handlePreview = async (file: UploadFile) => {
        if (file.response || file.url) {
            setPreviewImage(file.response || file.url);
            setPreviewOpen(true);
        }
    };

    const customRequest: UploadProps['customRequest'] = async ({ file, onSuccess, onProgress }) => {
        const formData = new FormData();
        formData.append('file', file);
        const requestFile = file as RcFile;

        try {
            const response = await imageApi.uploadImage(formData);
            const newImageUrl = response?.data.view_url; // Ваша логика получения URL
            if (newImageUrl?.startsWith("http")) {
                setFileList((prevFileList) => {
                    const updatedFileList = prevFileList.map(imageFile =>
                        imageFile.uid === requestFile.uid
                            ? { ...imageFile, url: newImageUrl, status: 'done' as UploadFileStatus }
                            : imageFile
                    );
                    return updatedFileList;
                })
                message.success('Image uploaded successfully');
                onSuccess && onSuccess(newImageUrl); // Сообщаем Upload-компоненту о завершении с телом ответа
            }
        } catch (error) {
            message.error('Image upload failed');
        }
    };

    useEffect(() => {
        defaultFileList && setFileList(defaultFileList)
    }, [])

    return (
        <>
        <Form.Item
            name={name}
            label={label}
            getValueFromEvent={normFile}
        >
            <Upload
                listType="picture-card"
                fileList={fileList}
                multiple={multiple}
                onChange={handleChange}
                onPreview={handlePreview}
                onRemove={handleFileRemove}
                customRequest={customRequest}
                maxCount={max}
            >
                {fileList.length < max && (
                    <button style={{ border: 0, background: 'none' }} type="button">
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                </button>
                )}
            </Upload>
        </Form.Item>
        {previewImage && (
                <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                    alt={`${name}-preview`}
                />
            )}
        </>
    );
};