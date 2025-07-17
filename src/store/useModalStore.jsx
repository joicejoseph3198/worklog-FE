import React from 'react'
import { create } from 'zustand';

export const useModalStore = create((set) => ({
    modalFlag: false,
    tag:"",
    description: "",
    title: "",
    modalHeading: "",
    currentTaskId: "",
    showModal: () => {
        set({ modalFlag: true})
    },
    hideModal: () => {
        set({ modalFlag: false})
        set({tag: ""})
        set({title: ""})
        set({description: ""})
    },
    changeTag: (value) => {
        set({tag: value})
    },
    changeTitle: (value) => {
        set({title: value})
    },
    changeDescription: (value) => {
        set({description: value})
    },
    setModalHeading: (value) => {
        set({modalHeading: value})
    },
    setCurrentTaskId: (id) => {
        set({currentTaskId: id})
    }
}));
