import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getWords } from '@/api/wordApi';
import { Word } from '@/models/word.model';
import { Button } from './ui/button';
import WordCRUD from './WordCRUD';
import { State } from '@/enum/state.enum';
import useLoading from '@/hooks/useLoading';
export default function WordList() {
    const [words, setWords] = useState<Word[]>([]);
    const [word, setWord] = useState<Word>()
    const [open, setOpen] = useState<boolean>(false)
    const [state, setState] = useState<State>()
    const { isLoading, stopLoading, startLoading } = useLoading()
    useEffect(() => {
        const fetchWords = async () => {
            try {
                startLoading();
                const data = await getWords(); // Gọi API lấy danh sách từ
                setWords(data); // Lưu vào state
                stopLoading()
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };

        fetchWords();
    }, []);

    const handleOpenChange = (state: State, index?: number) => {
        setOpen(true)
        setState(state)
        if (index != undefined) setWord(words[index])
    }
    if (isLoading) return <></>
    return (
        <>
            <WordCRUD open={open} setOpen={setOpen} state={state!} word={word} />
            <Button onClick={() => handleOpenChange(State.CREATE)}>Thêm mơi từ loại</Button>
            <Table>
                <TableCaption>Tổng hợp những từ mới</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>STT</TableHead>
                        <TableHead>Từ </TableHead>
                        <TableHead>Loại từ</TableHead>
                        <TableHead>Nghĩa</TableHead>
                        <TableHead>Hành động</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {words.length > 0 ? (
                        words.map((word, index) => (
                            <TableRow key={word.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{word.englishWord}</TableCell>
                                <TableCell>{word.wordType}</TableCell>
                                <TableCell>{word.vietNamWord}</TableCell>
                                <TableCell>
                                    <div className='flex items-center justify-between'>
                                        <Button onClick={() => handleOpenChange(State.UPDATE, index)} variant={"default"}>Chỉnh sửa</Button>
                                        <Button onClick={() => handleOpenChange(State.DELETE, index)} className='ml-2' variant={"destructive"}>Xóa</Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">
                                Không có dữ liệu
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}
