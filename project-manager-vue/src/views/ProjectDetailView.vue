<script lang="ts">
import { defineComponent, ref } from "vue";
import type { ProjectDTO } from "@/models/project.dto";
import type { IssueDTO } from "@/models/issue.dto";
import { StatusEnum, StatusTranslations } from "@/models/status.enum";
import { RouterLink, useRoute } from "vue-router";
import router from "@/router";
export default defineComponent({
  components: {},
  methods: {
    async getProject(id: string) {
      try {
        this.project = await (await fetch("/api/Project/" + id)).json();
        this.todoIssues = this.project.issues.filter(issue => issue.statusId === StatusEnum.New);
        this.inProgressIssues = this.project.issues.filter(issue => issue.statusId === StatusEnum.InProgress);
        this.doneIssues = this.project.issues.filter(issue => issue.statusId === StatusEnum.Done);
      } catch (err) {
        console.log(err);
      }
    },
    filterProjectIssues(issues: IssueDTO[]): IssueDTO[] {
      return issues.filter((issue) => issue.statusId !== StatusEnum.Done);
    },
  },
  async beforeRouteUpdate(to, from) {
    await this.getProject(to.params.id);
  },
  data() {
    return {
      project: ref<ProjectDTO>(),
      todoIssues: ref<IssueDTO[]>([]),
      inProgressIssues: ref<IssueDTO[]>([]),
      doneIssues: ref<IssueDTO[]>([]),
      StatusTranslations: StatusTranslations,
      StatusEnum: StatusEnum,
    };
  },
  async created() {
    const route = useRoute();
    const id = route.params.id;
    this.getProject(id);
  },
});
</script>

<template>
  <section class="p-5 h-full" v-if="project">
    <section class="columns-2 mb-2">
      <h1 class="text-3xl font-bold text-primary-900">{{ project.name }}</h1>
      <button type="button"
        class="text-white bg-amber-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium float-right rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Vytvořit issue
      </button>
    </section>

    <a-breadcrumb class="mb-4">
      <a-breadcrumb-item>Administrace</a-breadcrumb-item>
      <a-breadcrumb-item>
        <RouterLink to="/admin/projects">Projekty</RouterLink>
      </a-breadcrumb-item>
      <a-breadcrumb-item>
        <RouterLink :to="{ name: 'ProjectDetail', params: { id: project.id } }">{{ project.name }}</RouterLink>
      </a-breadcrumb-item>
    </a-breadcrumb>

    <section class="grid grid-cols-3 gap-4 pt-2 h-full">
      <div class="column bg-gray-200 h-full p-1 rounded-md px-3">
        <h2 class="text-gray-500 font-bold uppercase font-mono my-1">
          {{ StatusTranslations[StatusEnum.New] }} ({{ todoIssues.length }})
        </h2>
        <main v-if="todoIssues.length > 0">
          <section class="bg-white p-5 mb-4 shadow-md rounded-md hover:bg-gray-100 duration-300 hover:cursor-pointer"
            v-for='issue in todoIssues' :key="issue.id">

            <h2 class="text-xl font-bold  mb-4">{{ issue.summary }}</h2>
            <p class="">{{ issue.description }}</p>
            <section class="columns-2 pt-2">
              <p class="text-sm text-gray-500 pt-2">Zpracovává <br> <b>{{ issue.assignee.mail }}</b></p>
              <p class="text-sm text-gray-500 pt-2">Zadal <br> <b>{{ issue.reporter.mail }}</b></p>
            </section>
          </section>
        </main>
        <a-empty v-else></a-empty>
      </div>
      <div class="column bg-gray-200 h-full p-1 rounded-md px-3">
        <h2 class="text-gray-500 font-bold uppercase font-mono my-1">
          {{ StatusTranslations[StatusEnum.InProgress] }} ({{ inProgressIssues.length }})
        </h2>
        <main v-if="inProgressIssues.length > 0">
          <section class="bg-white p-5 mb-4 shadow-md rounded-md hover:bg-gray-100 duration-300 hover:cursor-pointer"
            v-for='issue in inProgressIssues' :key="issue.id">

            <h2 class="text-xl font-bold  mb-4">{{ issue.summary }}</h2>
            <p class="">{{ issue.description }}</p>
            <section class="columns-2 pt-2">
              <p class="text-sm text-gray-500 pt-2">Zpracovává <br> <b>{{ issue.assignee.mail }}</b></p>
              <p class="text-sm text-gray-500 pt-2">Zadal <br> <b>{{ issue.reporter.mail }}</b></p>
            </section>
          </section>
        </main>
        <a-empty v-else></a-empty>
      </div>
      <div class="column bg-gray-200 h-full p-1 rounded-md px-3">
        <h2 class="text-gray-500 font-bold uppercase font-mono my-1">
          {{ StatusTranslations[StatusEnum.Done] }} ({{ doneIssues.length }})
        </h2>
        <main v-if="doneIssues.length > 0">
          <section class="bg-white p-5 mb-4 shadow-md rounded-md hover:bg-gray-100 duration-300 hover:cursor-pointer"
            v-for='issue in doneIssues' :key="issue.id">

            <h2 class="text-xl font-bold mb-4"><s>{{ issue.summary }}</s></h2>
            <p class="">{{ issue.description }}</p>
            <section class="columns-2 pt-2">
              <p class="text-sm text-gray-500 pt-2">Zpracovává <br> <b>{{ issue.assignee.mail }}</b></p>
              <p class="text-sm text-gray-500 pt-2">Zadal <br> <b>{{ issue.reporter.mail }}</b></p>
            </section>
          </section>
        </main>
        <a-empty v-else></a-empty>
      </div>
    </section>
  </section>
</template>
