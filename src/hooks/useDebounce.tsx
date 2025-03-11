import { useState, useEffect } from 'react';

const useDebounce = (value: any, delay: number) => {
    // State để lưu giá trị đã được debounce
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Tạo một timeout để cập nhật debouncedValue sau khoảng delay
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup: Hủy timeout nếu value thay đổi trước khi delay kết thúc
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]); // Chạy lại effect khi value hoặc delay thay đổi

    // Trả về giá trị đã debounce
    return debouncedValue;
}

export default useDebounce; 