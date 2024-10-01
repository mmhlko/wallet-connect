import { UploadFile } from "antd";

export const getDefaultImageFileList = (images?: (string)[]) => {
    if (Array.isArray(images)) {
        const initialFileList: UploadFile[] = images?.map((url, index) => ({
            uid: `-${index}`,
            name: `Image ${index + 1}`,
            status: 'done',
            url: url,
            response: url,
        }))
        return initialFileList
    } else if ( typeof images === "string" && (images as string).startsWith("http") ) {
        const randomNumber = Math.floor(Math.random() * 10000)
        return ([{
            uid: `-${randomNumber}`,
            name: `Image ${randomNumber + 1}`,
            status: 'done',
            url: images,
            response: images,
        }] as UploadFile[])
    } else {
        return []
    }
}