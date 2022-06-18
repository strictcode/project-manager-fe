<script lang="ts">
import { defineComponent, ref } from "vue";
import type { ProjectDTO } from "@/models/project.dto";
import type { IssueDTO } from "@/models/issue.dto";
import { StatusEnum } from "@/models/status.enum";
import { RouterLink } from "vue-router";
export default defineComponent({
  components: {},
  methods: {
    async getData() {
      try {
        this.projects = await (await fetch("/api/Project")).json();
      } catch (err) {
        console.log(err);
      }
    },
    filterProjectIssues(issues: IssueDTO[]): IssueDTO[] {
      return issues.filter((issue) => issue.statusId !== StatusEnum.Done);
    },
  },
  data() {
    return {
      projects: ref<ProjectDTO[]>([]),
      // eslint-disable-next-line vue/no-dupe-keys
      footer: new Date().getFullYear(),
      collapsed: ref<boolean>(false),
      selectedKeys: ref<string[]>(["1"]),
    };
  },
  async created() {
    this.getData();
  },
});
</script>

<template>
  <section class="p-5 h-full">
    <section class="columns-2 mb-2">
      <h1 class="text-3xl font-bold text-primary-900">Projekty</h1>
      <button type="button"
        class="text-white bg-amber-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium float-right rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Vytvořit projekt
      </button>
    </section>

    <a-breadcrumb class="mb-4">
      <a-breadcrumb-item>
        <RouterLink to="/admin/Projects">Administrace</RouterLink>
      </a-breadcrumb-item>
      <a-breadcrumb-item>Projekty</a-breadcrumb-item>
    </a-breadcrumb>

    <section v-if="projects.length > 0">
      <section class="grid grid-cols-3 gap-4">
        <a-badge-ribbon :text="`Vlastník: ${project.createdName}`" v-for="project in projects" :key="project.id">
          <section class="bg-white p-5 shadow-md rounded-md">
            <h2 class="text-xl font-bold">{{ project.name }}</h2>
            <ul class="mt-2 h-24 overflow-auto">
              <li v-for="issue in filterProjectIssues(project.issues)" :key="issue.id">
                {{ issue.summary }}
              </li>
              <li v-if="filterProjectIssues(project.issues).length <= 0">
                Nejsou zadané žádné úkoly
              </li>
            </ul>
            <section class="columns-2 mt-2">
              <button type="button" routerLink="/admin/projects/{{project.id}}"
                class="text-white block w-full bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Zobrazit detail
              </button>
              <button type="button"
                class="text-white block w-full bg-amber-700 hover:bg-amber-800 focus:outline-none focus:ring-4 focus:ring-amber-300 font-medium text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800">
                Upravit projekt
              </button>
            </section>
          </section>
        </a-badge-ribbon>
      </section>
    </section>
    <section v-else>
      <a-empty />
    </section>
  </section>
</template>
