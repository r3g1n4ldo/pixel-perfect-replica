import { describe, expect, it } from "vitest";
import { filterProjects, projects, projectStatus, security } from "./portfolio";

describe("Portfolio project filters", () => {
  it("Todos includes every project", () => {
    expect(filterProjects("Todos")).toHaveLength(28);
  });
  it.each([
    ["Extensões", 12],
    ["Finanças", 3],
    ["Automação", 3],
    ["Infra", 4],
    ["Web", 5],
    ["Segurança", 1],
  ] as const)("filters %s projects without including other categories", (category, count) => {
    const result = filterProjects(category);
    expect(result).toHaveLength(count);
    expect(result.every((p) => p.category === category)).toBe(true);
    expect(result.length).toBeLessThan(projects.length);
  });
});
describe("Project details and status", () => {
  it("uses internal use unless an explicit status is supplied", () => {
    expect(projectStatus({ title: "Test", category: "Web", description: "", tags: [] })).toBe(
      "em uso interno",
    );
    expect(
      projectStatus({ title: "Test", category: "Web", description: "", tags: [], status: "no ar" }),
    ).toBe("no ar");
    expect(
      projectStatus({
        title: "Test",
        category: "Web",
        description: "",
        tags: [],
        status: "em desenvolvimento",
      }),
    ).toBe("em desenvolvimento");
  });
  it("includes the seven security fronts and VulnScan project", () => {
    expect(security).toHaveLength(7);
    expect(filterProjects("Segurança").map((project) => project.title)).toEqual(["VulnScan Pro"]);
  });
  it("provides complete details and three to four steps for all three featured projects", () => {
    const featured = projects.filter((project) => project.featured);
    expect(featured).toHaveLength(3);
    for (const project of featured) {
      expect(project.problem?.length).toBeGreaterThan(0);
      expect(project.solution?.length).toBeGreaterThan(0);
      expect(project.howItWorks?.length).toBeGreaterThanOrEqual(3);
      expect(project.howItWorks?.length).toBeLessThanOrEqual(4);
    }
  });
});
