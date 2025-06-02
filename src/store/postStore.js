import { create } from 'zustand'

const usePostStore = create((set) => ({
  // État
  posts: [],
  loading: false,
  error: null,

  // Actions
  setPosts: (posts) => set({ posts, error: null }),
  
  addPost: (post) => set((state) => ({ 
    posts: [{ ...post, id: Date.now(), createdAt: new Date().toISOString() }, ...state.posts] 
  })),
  
  updatePost: (postId, updatedPost) => set((state) => ({
    posts: state.posts.map(post => 
      post.id === postId ? { ...post, ...updatedPost } : post
    )
  })),
  
  deletePost: (postId) => set((state) => ({
    posts: state.posts.filter(post => post.id !== postId)
  })),
  
  likePost: (postId) => set((state) => ({
    posts: state.posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked
          }
        : post
    )
  })),
  
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  reset: () => set({
    posts: [],
    loading: false,
    error: null
  })
}))

export default usePostStore