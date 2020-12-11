<template>
  <div class="page">
    <h2 class="main-title">Документы</h2>
    <section class="docs">
      <article class="substrate">
        <div class="docs__search">
          <div v-if="getSize <= 1170" class="docs__sort">
            <h3 class="default-title">Сортировка</h3>
            <Radio-Btn v-model="setSort" />
          </div>
          <div class="row-search">
            <V-Search
              title="Название"
              placeholder="Поиск по названию"
              v-model="search"
              className="doc-table__search"
            />
            <V-Select
              v-model="setFilterByType"
              placeholder="Поиск по типу"
              :recovery="true"
              class="select"
            />
          </div>
        </div>
        <div class="table">
          <table ref="tbody" class="doc-table">
            <The-Header-Table
              v-model="setHeader"
              :orderBy="orderBy"
              :orderDirection="orderDirection"
            />
            <The-Main-Table
              :list="paginationTrimming"
              :countItemDocs="countItemDocs"
            />
          </table>
          <The-Pagination v-model="setActivePage" :activePage="activePage" />
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import RadioBtn from "@/components/radio-btn.vue";
import VSearch from "@/components/fields/FieldSearch.vue";
import VSelect from "@/components/fields/FieldSelect.vue";
import ThePagination from "@/components/docs/v-pagination.vue";
import TheMainTable from "@/components/docs/main-table.vue";
import TheHeaderTable from "@/components/docs/header-table.vue";
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
  components: {
    TheHeaderTable,
    TheMainTable,
    ThePagination,
    VSelect,
    VSearch,
    RadioBtn
  },

  data() {
    return {
      //height: null
    };
  },
  computed: {
    ...mapGetters("docs", { docs: "getOrderSearchDocs" }),
    ...mapGetters(["getSize"]),
    ...mapState("docs", [
      "textSearch",
      "countItemDocs",
      "activePage",
      "orderBy",
      "orderDirection"
    ]),

    ...mapState("mapList", ["mapDocumentTypeSort", "mapTypeSort", "theader"]),
    search: {
      get() {
        return this.textSearch;
      },
      set(text) {
        this.SET_TEXT_SEARCH(text);
      }
    },

    setFilterByType: {
      get() {
        return Object.keys(this.mapDocumentTypeSort).filter(el => el);
      },
      set(type) {
        this.SET_DOCUMENT_TYPE(type);
      }
    },

    setHeader: {
      get() {
        return this.theader;
      },
      set(newSort) {
        this.SET_ORDER_BY(newSort);
      }
    },
    setSort: {
      get() {
        return Object.values(this.theader).map(el => el.name);
      },
      set(newSort) {
        for (const key in this.theader) {
          if (this.theader[key].name === newSort) {
            this.SET_ORDER_BY(key);
            break;
          }
        }
      }
    },

    setActivePage: {
      get() {
        return this.countListPages;
      },
      set(newActivePage) {
        this.SET_ACTIVE_PAGE(newActivePage);
      }
    },

    paginationTrimming() {
      let start = (this.activePage - 1) * this.countItemDocs;
      let end = this.activePage * this.countItemDocs;
      return this.docs.slice(start, end);
    },

    countListPages() {
      return Math.ceil(this.docs.length / this.countItemDocs);
    }
  },

  methods: {
    ...mapMutations("docs", [
      "SET_ORDER_BY",
      "SET_TEXT_SEARCH",
      "SET_DOCUMENT_TYPE",
      "SET_ACTIVE_PAGE"
    ])
  }
};
</script>

<style lang="scss">
@import "@/assets/pages/docs.scss";
</style>
