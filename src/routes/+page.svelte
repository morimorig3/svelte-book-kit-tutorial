<script lang="ts">
  export let data;
  $: ({ products } = data);
</script>

<h1>商品一覧</h1>

<div class="casette-wrapper">
  <ul class="casette-list">
    {#each products as { id, name, images } (id)}
      <li class="casette">
        <a href="/products/{id}">
          <img src={images[0]} alt={name} />
          <p>{name}</p>
        </a>
      </li>
    {/each}
  </ul>
</div>

<style>
  .casette-wrapper {
    max-width: 100%;
    overflow: hidden;
  }
  .casette-list {
    display: flex;
    list-style-type: none;
    column-gap: 20px;
    padding-left: 20px;
    padding-right: 20px;
    overflow: scroll;
  }
  .casette {
    width: 200px;
  }
  .casette a {
    display: flex;
    flex-direction: column;
  }
  .casette p {
    margin: 0;
  }
</style>
