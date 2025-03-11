import React, { useEffect } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { State } from '@/enum/state.enum'
import { Word, wordDefault, wordSchema } from '@/models/word.model'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { WordType } from '@/enum/wordtype.enum';
import { addWord, deleteWord, getWords, updateWord } from '@/api/wordApi';
import useLoading from '@/hooks/useLoading';
import { Button } from './ui/button';
type FormProps = {
    open: boolean,
    setOpen: (value: boolean) => void,
    state: State,
    word?: Word
}
export default function WordCRUD({ open, setOpen, state, word }: FormProps) {
    const form = useForm<Word>({
        resolver: zodResolver(wordSchema),
        defaultValues: wordDefault
    });
    const { isLoading, stopLoading, startLoading } = useLoading()
    const getTitle = () => {
        switch (state) {
            case State.CREATE:
                return "Thêm mới dữ liệu";
            case State.UPDATE:
                return "Cập nhật dữ liệu";
            case State.DELETE:
                return "Xóa dữ liệu";
            default:
                return "";
        }
    };

    const getDescription = () => {
        switch (state) {
            case State.CREATE:
                return "Hãy nhập thông tin để tạo mới.";
            case State.UPDATE:
                return "Bạn có chắc chắn muốn cập nhật dữ liệu này?";
            case State.DELETE:
                return "Hành động này không thể hoàn tác. Bạn có chắc muốn xóa?";
            default:
                return "";
        }
    };
    const onSubmit = (values: Word) => {
        startLoading()
        setTimeout(() => {
            if (state === State.CREATE) handleCreate(values);
            else if (state === State.UPDATE) handleUpdate(values);
            stopLoading()
        }, 1000); // Trì hoãn 1 giây (1000ms)
    };

    const handleDelete = async () => {
        await deleteWord(word!.id);
        setOpen(false);
    };

    const handleUpdate = async (value: Word) => {
        await updateWord(word!.id, value);
        setOpen(false);
    };

    const handleCreate = async (value: Word) => {
        await addWord(value);
        setOpen(false);

    };

    useEffect(() => {
        if (word) {
            form.setValue('englishWord', word.englishWord)
            form.setValue('vietNamWord', word.vietNamWord)
            form.setValue('wordType', word.wordType)
        }
    }, [word])

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
            </AlertDialogTrigger>
            {state === State.CREATE || state === State.UPDATE ? (
                <AlertDialogContent >
                    <AlertDialogHeader>
                        <AlertDialogTitle className='text-black'>{getTitle()}</AlertDialogTitle>
                        <AlertDialogDescription>{getDescription()}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col space-y-1.5 flex-1">
                                <FormField
                                    control={form.control}
                                    name="englishWord"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Từ tiếng anh</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Từ tiếng anh" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5 flex-1">
                                <FormField
                                    control={form.control}
                                    name="vietNamWord"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Từ tiếng việt</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Từ tiếng Việt" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5 text-white">
                                <FormField
                                    control={form.control}
                                    name="wordType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Từ loại</FormLabel>
                                            <FormControl>
                                                <Select
                                                    key={field.value}
                                                    value={field.value?.toString()} // Lấy giá trị từ field
                                                    onValueChange={(value) => {
                                                        field.onChange(value)
                                                    }}>
                                                    <SelectTrigger id="framework">
                                                        <SelectValue placeholder="Chọn thành phố" />
                                                    </SelectTrigger>
                                                    <SelectContent position="popper">
                                                        {Object.values(WordType).map((type) => (
                                                            <SelectItem key={type} value={type}>
                                                                {type}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <AlertDialogFooter className='mt-4'>
                                <AlertDialogCancel>Hủy</AlertDialogCancel>
                                <Button loading={isLoading}>Tiếp tục</Button>
                            </AlertDialogFooter>
                        </form>
                    </Form>
                </AlertDialogContent>
            ) : <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{getTitle()}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {getDescription()}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                    <Button loading={isLoading} onClick={() => handleDelete()}>Tiếp tục</Button>
                </AlertDialogFooter>
            </AlertDialogContent>}
        </AlertDialog>
    )
}

