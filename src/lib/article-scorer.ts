interface WikiPage {
  pageid: number;
  title: string;
  extract: string;
  categories?: { title: string }[];
}

const STEM_CATEGORIES = [
  // Science
  'physics', 'chemistry', 'biology', 'astronomy', 'mathematics',
  'scientific', 'scientist', 'quantum', 'molecular', 'genetic',
  // Technology
  'computer', 'software', 'programming', 'artificial intelligence',
  'technology', 'engineering', 'robotics', 'computing', 'cyber',
  // Engineering
  'mechanical', 'electrical', 'aerospace', 'biomedical', 'chemical engineering',
  'civil engineering', 'structural', 'engineering',
  // Mathematics
  'mathematical', 'algebra', 'geometry', 'calculus', 'theorem',
  'number theory', 'topology', 'mathematical logic'
];

const STEM_KEYWORDS = [
  'algorithm', 'theory', 'research', 'discovery', 'innovation',
  'experiment', 'study', 'analysis', 'development', 'breakthrough',
  'quantum', 'molecular', 'computational', 'theoretical'
];

export function scoreArticle(page: WikiPage): number {
  let score = 0;
  
  // STEM Category scoring (heavy weight)
  page.categories?.forEach(category => {
    const categoryLower = category.title.toLowerCase();
    if (STEM_CATEGORIES.some(sc => categoryLower.includes(sc))) {
      score += 5; // High weight for STEM categories
    }
  });

  // Content length scoring
  if (page.extract) {
    const length = page.extract.length;
    if (length > 2000) score += 2;
    else if (length > 1000) score += 1;
  }

  // STEM keyword scoring
  const contentLower = (page.extract + page.title).toLowerCase();
  STEM_KEYWORDS.forEach(keyword => {
    if (contentLower.includes(keyword)) {
      score += 2;
    }
  });

  // Negative scoring for unwanted content
  if (page.title.includes('(disambiguation)')) score -= 10;
  if (page.title.startsWith('List of')) score -= 5;
  if (page.title.includes('(surname)')) score -= 8;
  
  // Bonus for academic or research-related titles
  if (page.title.includes('theory') || 
      page.title.includes('theorem') || 
      page.title.includes('principle')) {
    score += 3;
  }

  return score;
} 