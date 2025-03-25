import { create } from 'zustand';

export const useResourceStore = create((set) => ({
    resources: [],
    setResources: (resources) => set({ resources }),
    createResource: async (newResource) => {
        if (!newResource.name || !newResource.quantity || !newResource.type) {
            return { success: false, message: 'Please fill all fields' };
        }
        const res = await fetch('/api/resources', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newResource),
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set((state) => ({ resources: [...state.resources, data.data] }));
        return { success: true, message: 'Resource created successfully' };
    },
    fetchResources: async () => {
        const res = await fetch('/api/resources');
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set({ resources: data.data });
        return { success: true, message: 'Resources fetched successfully' };
    },
    deleteResource: async (id) => {
        const res = await fetch(`/api/resources/${id}`, {
            method: 'DELETE',
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        // Update the UI immediately
        set((state) => ({
            resources: state.resources.filter((resource) => resource._id !== id),
        }));
        return { success: true, message: data.message };
    },
    updateResource: async (id, selectedResource) => {
        const res = await fetch(`/api/resources/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(selectedResource),
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        // Update the UI immediately
        set((state) => ({
            resources: state.resources.map((resource) =>
                resource._id === id ? data.data : resource
            ),
        }));
        return { success: true, message: data.message };
    },
}));