import { render, screen } from '@testing-library/react';
import { Header } from "../components/header";
import { BrowserRouter, MemoryRouter, Route, Router, Routes } from 'react-router-dom';
import { combineReducers } from 'redux';
import tareasReducer from '../redux/reducers/tareasReducer';
import { EditarTarea } from '../components/editar-tarea';
import { Provider } from 'react-redux';
import store from '../redux/store';

describe('Test Component', () => {
    describe('Header', () => {
        test('header este presente', () => {
            render(
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Header />} />
                    </Routes>
                </BrowserRouter>
            )
            const headers = screen.queryByRole("heading", { name: "Mantenedor Tareas" });
            expect(headers).toBeInTheDocument()
        });

        test('button este presente', () => {
            render(
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Header />} />
                    </Routes>
                </BrowserRouter>
            )
            const button = screen.queryByRole("button", { name: "Agregar" });
            expect(button).toBeInTheDocument()
        });

        test('button este activo', () => {
            render(
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Header />} />
                    </Routes>
                </BrowserRouter>
            )
            const button = screen.queryByRole("button", { name: "Agregar" });
            expect(button).toBeEnabled()
        });

        test('tareas editar', () => {
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/tareas/editar/:id" element={<EditarTarea />} />
                        </Routes>
                    </BrowserRouter>
                </Provider>
            )
        })


    });
})
