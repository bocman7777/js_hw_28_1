import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
    todo: Yup.string()
        .min(5, "Мінімум 5 символів")
        .required("Обов'язкове поле"),
});

export default function App() {
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem("todos");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const addTodo = (values, { resetForm }) => {
        setTodos([...todos, { id: Date.now(), text: values.todo }]);
        resetForm();
    };

    const removeTodo = (id) => {
        setTodos(todos.filter((t) => t.id !== id));
    };

    return (
        <div style={{ maxWidth: "500px", margin: "30px auto", textAlign: "center" }}>
            <h1>📋 ToDo List</h1>

            <Formik
                initialValues={{ todo: "" }}
                validationSchema={validationSchema}
                onSubmit={addTodo}
            >
                <Form>
                    <Field
                        name="todo"
                        placeholder="Введіть завдання..."
                        style={{ padding: "10px", width: "70%" }}
                    />
                    <button type="submit" style={{ padding: "10px 20px", marginLeft: "10px" }}>
                        Додати
                    </button>
                    <div style={{ color: "red", marginTop: "5px" }}>
                        <ErrorMessage name="todo" />
                    </div>
                </Form>
            </Formik>

            <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
                {todos.map((t) => (
                    <li key={t.id} style={{ marginBottom: "10px" }}>
                        {t.text}
                        <button
                            onClick={() => removeTodo(t.id)}
                            style={{ marginLeft: "10px", padding: "5px 10px" }}
                        >
                            ❌
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
