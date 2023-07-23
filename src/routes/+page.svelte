<script lang="ts">
  export let data;
  $: ({ products } = data);
</script>

<h1>商品一覧</h1>

<div class="casette-wrapper">
  <ul class="casette-list">
    {#each products as { id, name, images, price } (id)}
      <li class="casette">
        <a class="hover-card" data-price={`${price}`} href="/products/{id}">
          <img src={images[0]} alt={name} />
          <p>{name}</p>
        </a>
      </li>
    {/each}
  </ul>
</div>

<style>
  h1 {
    font-size: 32px;
  }
  .casette-wrapper {
    max-width: 100%;
    overflow: hidden;
  }
  .casette-list {
    display: flex;
    list-style-type: none;
    column-gap: 24px;
    overflow: scroll;
    padding: 0;
  }
  .casette {
    width: 200px;
    flex-shrink: 0;
    flex-basis: auto;
  }
  .hover-card {
    position: relative;
    overflow: hidden;
  }
  .hover-card::before,
  .hover-card::after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    transition: 0.25s;
    opacity: 0;
  }
  .hover-card::before {
    background: rgba(192, 192, 192, 0.8);
    width: 100%;
    height: 100%;
  }
  .hover-card::after {
    color: #fff;
    content: attr(data-price);
    font-family: "Roboto", sans-serif;
    font-size: 22px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    bottom: 0;
    right: 0;
  }

  .hover-card:hover::before,
  .hover-card:hover::after {
    opacity: 1;
  }

  .casette a {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    row-gap: 10px;
    color: #1e293b;
  }
  .casette a:hover {
    cursor: pointer;
  }
  .casette img {
    width: 100%;
  }
  .casette p {
    margin: 0;
  }
</style>
