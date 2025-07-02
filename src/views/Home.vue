<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Indonesia Operating System List</h1>
      <o-notification
        :has-icon="false"
        variant="info"
        aria-close-label="Close notification"
      >
        Currently the data manually insert into here. The source of data is from
        <a
          class="has-text-white"
          href="https://distrowatch.com/search.php?ostype=All&category=All&origin=Indonesia&basedon=All&notbasedon=None&desktop=All&architecture=All&package=All&rolling=All&isosize=All&netinstall=All&language=All&defaultinit=All&status=All#simple"
          >Distrowatch</a
        >. Feel free to contribute in this website.
      </o-notification>
      <o-table narrowed striped hoverable bordered :data="listData">
        <o-table-column v-slot="props" field="id" label="ID" sortable>
          {{ props.row.id }}
        </o-table-column>
        <o-table-column v-slot="props" field="name" label="Name" sortable>
          {{ props.row.name }}
        </o-table-column>
        <o-table-column
          v-slot="props"
          field="publisher"
          label="Publisher"
          sortable
        >
          {{ props.row.publisher }}
        </o-table-column>
        <o-table-column
          v-slot="props"
          field="publishedSince"
          label="Published Date"
          sortable
        >
          {{ changeFormat(props.row.publishedSince) }}
        </o-table-column>
        <o-table-column v-slot="props" field="website" label="Website" sortable>
          <a :href="props.row.website">{{ props.row.website }}</a>
        </o-table-column>
        <o-table-column v-slot="props" field="status" label="Status" sortable>
          <div
            :style="
              props.row.status === 'Active' ? 'color:green;' : 'color:red;'
            "
          >
            {{ props.row.status }}
          </div>
        </o-table-column>
      </o-table>
    </div>
  </section>
</template>

<script lang="ts" src="./home.ts"></script>
