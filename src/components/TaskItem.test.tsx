import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from './TaskItem';

describe('TaskItem Component', () => {
    const task = {
        id: 1,
        title: 'Test Task',
        completed: false,
    };

    const onDeleteMock = jest.fn();
    const onToggleMock = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the task title', () => {
        render(<TaskItem task={task} onDelete={onDeleteMock} onToggle={onToggleMock} />);

        expect(screen.getByText('Test Task')).toBeInTheDocument();
    });

    test('applies correct styles when task is completed', () => {
        const completedTask = { ...task, completed: true };
        render(<TaskItem task={completedTask} onDelete={onDeleteMock} onToggle={onToggleMock} />);

        const taskTitle = screen.getByText('Test Task');
        expect(taskTitle).toHaveClass('line-through');
        expect(taskTitle).toHaveClass('text-green-500');
    });

    test('applies correct styles when task is not completed', () => {
        render(<TaskItem task={task} onDelete={onDeleteMock} onToggle={onToggleMock} />);

        const taskTitle = screen.getByText('Test Task');
        expect(taskTitle).toHaveClass('text-black');
        expect(taskTitle).not.toHaveClass('line-through');
    });

    test('onToggle is called with correct id when task title is clicked', () => {
        render(<TaskItem task={task} onDelete={onDeleteMock} onToggle={onToggleMock} />);

        const taskTitle = screen.getByText('Test Task');
        fireEvent.click(taskTitle);

        expect(onToggleMock).toHaveBeenCalledTimes(1);
        expect(onToggleMock).toHaveBeenCalledWith(task.id);
    });

    test('onDelete is called with correct id when delete button is clicked', () => {
        render(<TaskItem task={task} onDelete={onDeleteMock} onToggle={onToggleMock} />);

        const deleteButton = screen.getByText('Delete');
        fireEvent.click(deleteButton);

        expect(onDeleteMock).toHaveBeenCalledTimes(1);
        expect(onDeleteMock).toHaveBeenCalledWith(task.id);
    });
});