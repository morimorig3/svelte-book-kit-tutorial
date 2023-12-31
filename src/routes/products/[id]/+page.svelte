<script lang="ts">
  import { page } from "$app/stores";
  import { afterNavigate } from "$app/navigation";
  import type { Product } from "$lib/server/mongodb";
  import Slider from "../../Slider.svelte";
  import { onMount } from "svelte";
  import { enhance } from "$app/forms";
  import type { WithId } from "mongodb";

  export let data;
  $: ({ product, relatedProducts } = data);

  let cart: WithId<Product>[] = [];

  let recommendRequest = new Promise<Product[]>(() => {});
  let userRequest = new Promise(() => {});

  async function loadCart() {
    cart = await fetch(`/api/cart`).then((res) => res.json());
  }

  onMount(() => {
    loadCart();
  });

  afterNavigate(() => {
    const productId = product?.id as string;
    recommendRequest = fetch(`/api/recommend?id=${productId}`).then((res) =>
      res.json(),
    );
    userRequest = fetch(`/api/self`).then((res) => res.json());
  });
</script>

<svelte:head>
  <meta name="twitter:card" content="summary" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={$page.url.href} />
  <meta property="og:title" content={product?.name} />
  <meta
    property="og:image"
    content={`${$page.url.origin}${product?.images[0]}`}
  />
  <meta
    property="og:description"
    content={`${product?.name} - ${product?.price}円`}
  />
</svelte:head>

<article class="product">
  {#if product}
    <div class="product-main">
      <div class="image-container">
        <Slider images={product.images} />
      </div>

      <div>
        <h2>{product.name}</h2>
        <dl>
          <dt>価格</dt>
          <dd>{product.price}円</dd>
        </dl>
        <div>
          {#if !cart.find((item) => item.id === product?.id)}
            <form
              method="POST"
              action="/cart?/add"
              use:enhance={() => {
                return async ({ update }) => {
                  await update();
                  await loadCart();
                };
              }}
            >
              <input type="hidden" value={product.id} name="productId" />
              {#await userRequest}
                <button>カートに入れる</button>
              {:then user}
                <button disabled={!user}>カートに入れる</button>
                {#if !user}
                  <p>
                    カートを使うには<a href="/login">ログイン</a>してください。
                  </p>
                {/if}
              {/await}
            </form>
          {:else}
            <button disabled>カート追加済み</button>
          {/if}
        </div>
      </div>
    </div>
  {/if}

  <footer>
    <h3>おすすめ商品</h3>
    {#await recommendRequest}
      <div>ロード中</div>
    {:then products}
      {#each products as product}
        <ul>
          <li>
            <a href="/products/{product.id}">{product.name}</a>
            - {product.price}円
          </li>
        </ul>
      {/each}
    {/await}
    <h3>関連商品</h3>
    <ul>
      {#each relatedProducts as { id, name, price }}
        <li>
          <a href="/products/{id}">{name}</a>
          - {price}円
        </li>
      {/each}
    </ul>
  </footer>
</article>

<style>
  .product {
    padding: 15px;
  }

  .product-main {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .image-container {
    width: 100%;
    max-width: 400px;
    overflow: hidden;
  }
</style>
