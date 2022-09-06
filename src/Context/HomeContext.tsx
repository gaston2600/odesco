import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useRef } from 'react'
import CommentsModalize from '../components/modals/CommentsModalize';

const HomeContext = createContext(null);

export { HomeContext };

export default ({ children }: any) => {
    const modalizeRef = useRef(null);
    const openCommentModalize = () => {
        modalizeRef?.current?.open();
    }
    const closeCommentModalize = () => {
        modalizeRef?.current?.close();
    }

    let homeContext = {
        openCommentModalize,
        closeCommentModalize
    };

    return (
        <HomeContext.Provider value={homeContext}>
            {children}
            <CommentsModalize modalizeRef={modalizeRef} />
        </HomeContext.Provider>
    )
}


const styles = StyleSheet.create({})