import { describe, expect, it } from 'vitest';
import { filterProjects, projects } from './portfolio';

describe('Portfolio project filters', () => {
  it('Todos includes every project', () => {
    expect(filterProjects('Todos')).toHaveLength(24);
  });
  it.each([
    ['Extensões', 12], ['Finanças', 3], ['Automação', 3], ['Infra', 2], ['Web', 4],
  ] as const)('filters %s projects without including other categories', (category, count) => {
    const result = filterProjects(category);
    expect(result).toHaveLength(count);
    expect(result.every(p => p.category === category)).toBe(true);
    expect(result.length).toBeLessThan(projects.length);
  });
});