<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Indonesia Operating System List</h1>
      <b-notification type="is-info" aria-close-label="Close notification">
        Currently the data manually insert into here. The source of data is from
        <a
          href="https://distrowatch.com/search.php?ostype=All&category=All&origin=Indonesia&basedon=All&notbasedon=None&desktop=All&architecture=All&package=All&rolling=All&isosize=All&netinstall=All&language=All&defaultinit=All&status=All#simple"
          >Distrowatch</a
        >. Feel free to contribute in this website.
      </b-notification>
      <b-table narrowed striped hoverable bordered :data="data">
        <b-table-column field="id" label="ID" sortable v-slot="props">
          {{ props.row.id }}
        </b-table-column>
        <b-table-column field="name" label="Name" sortable v-slot="props">
          {{ props.row.name }}
        </b-table-column>
        <b-table-column
          field="publisher"
          label="Publisher"
          sortable
          v-slot="props"
        >
          {{ props.row.publisher }}
        </b-table-column>
        <b-table-column
          field="publishedSince"
          label="Published Date"
          sortable
          v-slot="props"
        >
          {{ changeFormat(props.row.publishedSince) }}
        </b-table-column>
        <b-table-column field="website" label="Website" sortable v-slot="props">
          <a :href="props.row.website">{{ props.row.website }}</a>
        </b-table-column>
        <b-table-column field="status" label="Status" sortable v-slot="props">
          <div
            :style="
              props.row.status === 'Active' ? 'color:green;' : 'color:red;'
            "
          >
            {{ props.row.status }}
          </div>
        </b-table-column>
      </b-table>
    </div>
  </section>
</template>

<script lang="ts" src="./home.ts"></script>
