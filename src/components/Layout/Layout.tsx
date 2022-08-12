import React from 'react'
import { Toaster } from 'react-hot-toast';
import Navbar from '../Navbar/Navbar'

type Props = {
    children: JSX.Element,
};

export default function Layout({ children }: Props) {
    return (
        <div className='layout'>
            <Toaster />
            <Navbar />
            {children}
        </div>
    )
}
