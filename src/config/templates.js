export const templates = {
 modern: {
    id: 'modern',
    name: 'Modern Minimalist',
    description: 'Clean and professional design',
    colors: {
      primary: '#3B82F6',
      secondary: '#1E40AF', 
      accent: '#6366F1',
      background: '#F8FAFC',
      surface: '#FFFFFF',
      text: '#1F2937',
      textSecondary: '#4B5563', // Lebih gelap untuk contrast yang lebih baik
      border: '#E5E7EB',
      success: '#10B981',
      error: '#EF4444',
      warning: '#F59E0B'
    },
    styles: {
      borderRadius: '0.75rem',
      shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    }
  },

  dark: {
	  id: 'dark',
	  name: 'Dark Professional',
	  description: 'Elegant dark theme',
	  colors: {
		primary: '#6366F1',
		secondary: '#4F46E5',
		accent: '#8B5CF6',
		background: '#111827',
		surface: '#1F2937',
		text: '#F9FAFB', // Pastikan warna terang untuk contrast
		textSecondary: '#E5E7EB', // Warna lebih terang
		border: '#374151',
		success: '#10B981',
		error: '#EF4444',
		warning: '#F59E0B'
	  },
    styles: {
      borderRadius: '0.5rem',
      shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
    }
  },

  vibrant: {
    id: 'vibrant',
    name: 'Colorful Vibrant',
    description: 'Bright and energetic colors',
    colors: {
      primary: '#EC4899',
      secondary: '#DB2777',
      accent: '#F59E0B',
      background: '#FEF7FF',
      surface: '#FFFFFF',
      text: '#1F2937',
      textSecondary: '#6B7280'
    },
    styles: {
      borderRadius: '1rem',
      shadow: '0 20px 25px -5px rgba(236, 72, 153, 0.2)',
      border: '1px solid #FBCFE8'
    }
  },

  luxury: {
    id: 'luxury',
    name: 'Elegant Luxury',
    description: 'Premium gold and dark theme',
    colors: {
      primary: '#D97706',
      secondary: '#B45309',
      accent: '#F59E0B',
      background: '#1C1917',
      surface: '#292524',
      text: '#FEF3C7',
      textSecondary: '#D6D3D1'
    },
    styles: {
      borderRadius: '0.375rem',
      shadow: '0 25px 50px -12px rgba(217, 119, 6, 0.25)',
      border: '1px solid #57534E'
    }
  },

  nature: {
    id: 'nature',
    name: 'Nature Green',
    description: 'Fresh and organic feel',
    colors: {
      primary: '#10B981',
      secondary: '#059669',
      accent: '#84CC16',
      background: '#F0FDF4',
      surface: '#FFFFFF',
      text: '#064E3B',
      textSecondary: '#047857'
    },
    styles: {
      borderRadius: '1.5rem',
      shadow: '0 10px 15px -3px rgba(16, 185, 129, 0.2)',
      border: '1px solid #A7F3D0'
    }
  },

  ocean: {
    id: 'ocean',
    name: 'Ocean Blue',
    description: 'Calm blue ocean theme',
    colors: {
      primary: '#06B6D4',
      secondary: '#0891B2',
      accent: '#0EA5E9',
      background: '#F0FDFA',
      surface: '#FFFFFF',
      text: '#164E63',
      textSecondary: '#0E7490'
    },
    styles: {
      borderRadius: '0.75rem',
      shadow: '0 10px 15px -3px rgba(6, 182, 212, 0.2)',
      border: '1px solid #99F6E4'
    }
  },

  sunset: {
    id: 'sunset',
    name: 'Warm Sunset',
    description: 'Warm orange and purple tones',
    colors: {
      primary: '#F97316',
      secondary: '#EA580C',
      accent: '#DC2626',
      background: '#FFF7ED',
      surface: '#FFFFFF',
      text: '#7C2D12',
      textSecondary: '#C2410C'
    },
    styles: {
      borderRadius: '0.875rem',
      shadow: '0 20px 25px -5px rgba(249, 115, 22, 0.2)',
      border: '1px solid #FDBA74'
    }
  },

  cyber: {
    id: 'cyber',
	  name: 'Cyber Neon',
	  description: 'Futuristic neon theme',
	  colors: {
		primary: '#00D4FF',
		secondary: '#0099FF',
		accent: '#FF0080',
		background: '#0A0A0A',
		surface: '#1A1A1A',
		text: '#FFFFFF', // Putih untuk contrast maksimal
		textSecondary: '#E0E0E0', // Abu-abu terang
		border: '#00D4FF',
		success: '#00FF88',
		error: '#FF0066',
		warning: '#FFAA00'
    },
    styles: {
      borderRadius: '0.25rem',
      shadow: '0 0 20px rgba(0, 212, 255, 0.5)'
    }
  },



  retro: {
    id: 'retro',
    name: 'Retro Vintage',
    description: 'Nostalgic 80s style',
    colors: {
      primary: '#FF6B6B',
      secondary: '#FF8E8E',
      accent: '#4ECDC4',
      background: '#FFF9C4',
      surface: '#FFFFFF',
      text: '#2D3748',
      textSecondary: '#4A5568'
    },
    styles: {
      borderRadius: '0rem',
      shadow: '8px 8px 0px rgba(0, 0, 0, 0.2)',
      border: '3px solid #2D3748'
    }
  },

  clean: {
    id: 'clean',
    name: 'Clean White',
    description: 'Minimal white theme',
    colors: {
      primary: '#000000',
      secondary: '#374151',
      accent: '#6B7280',
      background: '#FFFFFF',
      surface: '#F9FAFB',
      text: '#111827',
      textSecondary: '#6B7280'
    },
    styles: {
      borderRadius: '0.5rem',
      shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      border: '1px solid #E5E7EB'
    }
  }
}

export const getTemplateById = (id) => templates[id] || templates.modern