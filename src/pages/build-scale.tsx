import { Formik, Form, Field, FieldProps } from 'formik';
import { useEffect, useState, useId } from 'react';
import { format } from 'date-fns';
import Select from 'react-select';

import { RegiterScale } from './api/scale';
import { GetUsers } from './api/auth';
import ScaleData from '@/Models/ScaleData';
import Header from '@/components/header';
import toast from 'react-hot-toast';
import GetSundays from '@/lib/GetSundays';

export default function BuildScale() {
    
    const [apiData, setApiData] = useState<string[]>([]);
    const [token, setToken] = useState<string>('');
    const initialUserData: ScaleData = {
        dateScale: '',
        managerName: '',
        firstBack: '',
        secondBack: '',
        thirdBack: '',
        guitarMusician: '',
        guitarristMusician: '',
        drumMusician: '',
        bassMusician: '',
        keyboardMusician: ''
    };

    useEffect(() => {
        const fetchData = async () => {
            const user = JSON.parse(atob(window.sessionStorage.getItem('auth') || '{}'))
            const token = user?.accessToken
            setToken(token)

            const res = await GetUsers();
            const values = res?.resultList.map((data: any) => data.nom_Login);
            setApiData(values || []);
        };

        fetchData();
    }, []);
    
    const sundayOptions = GetSundays(); // domingos do mês vigente + 2 meses para frente    
    const selectId = useId();    
   
    return (
        <>
            <Header />
            <div className="flex items-center justify-center h-full">
                <div className="w-3/4 h-70 bg-gray-100 rounded border border-t-2 border-b-4 border-gray-300 shadow p-6">
                    <h1 className="text-4xl font-bold text-center mb-4">Montar Escala</h1>
                    <Formik
                        initialValues={initialUserData}
                        onSubmit={async (values, { resetForm }) =>{
                            if (values.managerName == null || values.managerName == '' ||
                                values.dateScale == null   || values.dateScale == ''){
                                    toast.error('Não foi inserido o dirigente ou dia da escala')
                                } else{

                                    const data = await RegiterScale(values, token)
                                    if (data.success){
                                        resetForm();
                                        toast.success('Escala criada com sucesso!')
                                    } else{
                                        resetForm();
                                        toast.error(data.errors[0]?.description)
                                    }
                                }
                                 
                            
                                 console.log(values)
                            
                        }}
                    >
                        <Form className="space-y-4">
                            <div className='flex justify-center'>
                                <Field name='dateScale'>
                                     {({ field, form }: FieldProps<string>) => (
                                       <Select
                                         options={sundayOptions}
                                         placeholder='Data da Escala'
                                         className='text-center border border-2 w-1/2'
                                         instanceId={selectId} 
                                         value={sundayOptions.find((option) => option.value === field.value)}
                                         onChange={(option) => form.setFieldValue(field.name, option ? option.value : '')}
                                         onBlur={field.onBlur}
                                       />
                                     )}
                                </Field>
                            </div>                           
                            <div className='flex justify-center'>
                                <Field name='managerName'>
                                    {({ field, form }: FieldProps<string>) => {
                                        return (
                                            <Select
                                                options={apiData.map((user: string) => ({
                                                    value: user,
                                                    label: user
                                                }))}
                                                placeholder='Dirigente'
                                                className='text-center border border-2 w-1/2'
                                                instanceId={selectId}
                                                value={apiData.find((user) => user === field.value) ? { value: field.value, label: field.value } : null}
                                                onChange={(option: any) => form.setFieldValue(field.name, option ? option.value : '')}
                                                onBlur={field.onBlur}
                                            />
                                        );
                                    }}
                                </Field>
                            </div>
                            <div className='flex justify-center'>
                                <Field name='firstBack'>
                                    {({ field, form }: FieldProps<string>) => {
                                        return (
                                            <Select
                                                options={apiData.map((user: string) => ({
                                                    value: user,
                                                    label: user
                                                }))}
                                                placeholder='Back 1'
                                                className='text-center border border-2 w-1/2'
                                                instanceId={selectId}
                                                value={apiData.find((user) => user === field.value) ? { value: field.value, label: field.value } : null}
                                                onChange={(option: any) => form.setFieldValue(field.name, option ? option.value : '')}
                                                onBlur={field.onBlur}
                                            />
                                        );
                                    }}
                                </Field>
                            </div>
                            <div className='flex justify-center'>
                                <Field name='secondBack'>
                                    {({ field, form }: FieldProps<string>) => {
                                        return (
                                            <Select
                                                options={apiData.map((user: string) => ({
                                                    value: user,
                                                    label: user
                                                }))}
                                                placeholder='Back 2'
                                                className='text-center border border-2 w-1/2'
                                                instanceId={selectId}
                                                value={apiData.find((user) => user === field.value) ? { value: field.value, label: field.value } : null}
                                                onChange={(option: any) => form.setFieldValue(field.name, option ? option.value : '')}
                                                onBlur={field.onBlur}
                                            />
                                        );
                                    }}
                                </Field>
                            </div>
                            <div className='flex justify-center'>
                                <Field name='thirdBack'>
                                    {({ field, form }: FieldProps<string>) => {
                                        return (
                                            <Select
                                                options={apiData.map((user: string) => ({
                                                    value: user,
                                                    label: user
                                                }))}
                                                placeholder='Back 3'
                                                className='text-center border border-2 w-1/2'
                                                instanceId={selectId}
                                                value={apiData.find((user) => user === field.value) ? { value: field.value, label: field.value } : null}
                                                onChange={(option: any) => form.setFieldValue(field.name, option ? option.value : '')}
                                                onBlur={field.onBlur}
                                            />
                                        );
                                    }}
                                </Field>
                            </div>
                            <div className='flex justify-center'>
                                <Field name='guitarMusician'>
                                    {({ field, form }: FieldProps<string>) => {
                                        return (
                                            <Select
                                                options={apiData.map((user: string) => ({
                                                    value: user,
                                                    label: user
                                                }))}
                                                placeholder='Violão'
                                                className='text-center border border-2 w-1/2'
                                                instanceId={selectId}
                                                value={apiData.find((user) => user === field.value) ? { value: field.value, label: field.value } : null}
                                                onChange={(option: any) => form.setFieldValue(field.name, option ? option.value : '')}
                                                onBlur={field.onBlur}
                                            />
                                        );
                                    }}
                                </Field>
                            </div>
                            <div className='flex justify-center'>
                                <Field name='guitarristMusician'>
                                    {({ field, form }: FieldProps<string>) => {
                                        return (
                                            <Select
                                                options={apiData.map((user: string) => ({
                                                    value: user,
                                                    label: user
                                                }))}
                                                placeholder='Guitarra'
                                                className='text-center border border-2 w-1/2'
                                                instanceId={selectId}
                                                value={apiData.find((user) => user === field.value) ? { value: field.value, label: field.value } : null}
                                                onChange={(option: any) => form.setFieldValue(field.name, option ? option.value : '')}
                                                onBlur={field.onBlur}
                                            />
                                        );
                                    }}
                                </Field>
                            </div>
                            <div className='flex justify-center'>
                                <Field name='drumMusician'>
                                    {({ field, form }: FieldProps<string>) => {
                                        return (
                                            <Select
                                                options={apiData.map((user: string) => ({
                                                    value: user,
                                                    label: user
                                                }))}
                                                placeholder='Bateria'
                                                className='text-center border border-2 w-1/2'
                                                instanceId={selectId}
                                                value={apiData.find((user) => user === field.value) ? { value: field.value, label: field.value } : null}
                                                onChange={(option: any) => form.setFieldValue(field.name, option ? option.value : '')}
                                                onBlur={field.onBlur}
                                            />
                                        );
                                    }}
                                </Field>
                            </div>
                            <div className='flex justify-center'>
                                <Field name='bassMusician'>
                                    {({ field, form }: FieldProps<string>) => {
                                        return (
                                            <Select
                                                options={apiData.map((user: string) => ({
                                                    value: user,
                                                    label: user
                                                }))}
                                                placeholder='Baixo'
                                                className='text-center border border-2 w-1/2'
                                                instanceId={selectId}
                                                value={apiData.find((user) => user === field.value) ? { value: field.value, label: field.value } : null}
                                                onChange={(option: any) => form.setFieldValue(field.name, option ? option.value : '')}
                                                onBlur={field.onBlur}
                                            />
                                        );
                                    }}
                                </Field>
                            </div>
                            <div className='flex justify-center'>
                                <Field name='keyboardMusician'>
                                    {({ field, form }: FieldProps<string>) => {
                                        return (
                                            <Select
                                                options={apiData.map((user: string) => ({
                                                    value: user,
                                                    label: user
                                                }))}
                                                placeholder='Teclado'
                                                className='text-center border border-2 w-1/2'
                                                instanceId={selectId}
                                                value={apiData.find((user) => user === field.value) ? { value: field.value, label: field.value } : null}
                                                onChange={(option: any) => form.setFieldValue(field.name, option ? option.value : '')}
                                                onBlur={field.onBlur}
                                            />
                                        );
                                    }}
                                </Field>
                            </div>
                            <div className="flex justify-center">
                                <button
                                    type='submit'
                                    className='bg-blue-900 hover:bg-blue-700 text-white px-4 py-2 rounded w-2/4'
                                >
                                    Enviar
                                </button>
                            </div>                            
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    );
}
