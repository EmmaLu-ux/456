import { useEffect, useState } from "react"
import { Form, Input } from 'antd'
import { useBoolean } from 'ahooks'

const EditableFormItem = (props) => {
    const { form, label, fieldName, state } = props || {}
    const [inputValue, setInputValue] = useState()

    useEffect(() => {
        setInputValue(fieldName || '')
        form.setFieldValue(fieldName, fieldName || '');
    }, [fieldName])

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
    };
    const handlePressEnter = () => {
        form.validateFields([fieldName]).then(() => {
            form.setFieldValue(fieldName, inputValue);
            setFalse();
            // afterChange && afterChange(fieldName, inputValue);
        }).catch(error => {
            console.log(error);
        })
    };
    const handleDetailsEdit = () => { }
    return (
        <Form.Item
            label={label}
            name={fieldName}
            rules={[
                {
                    required: true,
                    message: `请输入正确的${label}!`,
                }
            ]}
        >
            {state ? (
                <Input size='small' autoFocus onChange={handleInputChange} value={inputValue} onPressEnter={handlePressEnter} />
            ) : (
                <div>
                    <span style={{ display: 'inline-block', marginRight: '10px' }}>
                        {inputValue}
                    </span>
                    {/* <EditOutlined onClick={setTrue} /> */}
                </div>
            )}
        </Form.Item>
    )
}

export default EditableFormItem