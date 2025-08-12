import { create } from 'zustand';
import apiClient from '../services/api';

export const useContentStore = create((set, get) => ({
  subjects: [],
  chapters: [],
  currentSubject: null,
  currentLesson: null,
  loading: false,
  error: null,

  fetchSubjects: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.get('/content/subjects');
      set({ subjects: data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message, loading: false });
    }
  },

  fetchChaptersBySubject: async (subjectId) => {
    set({ loading: true, error: null });
    try {
      // Find subject details from already fetched subjects list
      const subjectDetails = get().subjects.find(s => s._id === subjectId);
      const { data } = await apiClient.get(`/content/subjects/${subjectId}/chapters`);
      set({ chapters: data, currentSubject: subjectDetails, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message, loading: false });
    }
  },

  fetchLessonDetails: async (lessonId) => {
    set({ loading: true, error: null, currentLesson: null });
    
    try {
      const { data } = await apiClient.get(`/content/lessons/${lessonId}`);
      
      if (!data?.success) {
        throw new Error(data?.message || 'Invalid lesson data received');
      }

      // Normalize the lesson data
      const normalizedLesson = {
        ...data.data,
        quiz: data.data.quiz || undefined
      };

      set({ 
        currentLesson: normalizedLesson,
        loading: false,
        error: null
      });

      return normalizedLesson;

    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         'Failed to load lesson details';
      
      console.error('Lesson fetch error:', errorMessage, error);
      
      set({ 
        error: errorMessage,
        loading: false,
        currentLesson: null
      });
      
      throw error;
    }
  },
}));