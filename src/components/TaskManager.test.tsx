import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskManager from './TaskManager';

// These are basic tests that could be
describe('TaskManager Component', () => {
    beforeEach(() => {
        localStorage.clear(); // Clear localStorage before each test
    });

    test('renders the initial tasks', () => {
        render(<TaskManager />);

        // Check that initial tasks are rendered
        expect(screen.getByText('Buy groceries')).toBeInTheDocument();
        expect(screen.getByText('Clean the house')).toBeInTheDocument();
    });

    test('adds a new task', () => {
        render(<TaskManager />);

        const input = screen.getByPlaceholderText('New task...');
        const addButton = screen.getByText('Add');

        fireEvent.change(input, { target: { value: 'New Task' } });
        fireEvent.click(addButton);

        expect(screen.getByText('New Task')).toBeInTheDocument();
    });

    test('deletes a task', () => {
        render(<TaskManager />);

        const deleteButton = screen.getAllByText('Delete')[0];
        fireEvent.click(deleteButton);

        expect(screen.queryByText('Buy groceries')).not.toBeInTheDocument();
    });

    test('toggles task completion', () => {
        render(<TaskManager />);

        const taskItem = screen.getByText('Buy groceries');
        fireEvent.click(taskItem);

        // Check if the task has the 'line-through' styling to indicate completion
        expect(taskItem).toHaveClass('line-through');
    });

    test('changes filter to completed', () => {
        render(<TaskManager />);

        const completedFilterButton = screen.getByText('Completed');
        fireEvent.click(completedFilterButton);

        // Only the completed task should be visible
        expect(screen.getByText('Clean the house')).toBeInTheDocument();
        expect(screen.queryByText('Buy groceries')).not.toBeInTheDocument();
    });

    test('changes filter to pending', () => {
        render(<TaskManager />);

        const pendingFilterButton = screen.getByText('Pending');
        fireEvent.click(pendingFilterButton);

        // Only the pending task should be visible
        expect(screen.getByText('Buy groceries')).toBeInTheDocument();
        expect(screen.queryByText('Clean the house')).not.toBeInTheDocument();
    });
});