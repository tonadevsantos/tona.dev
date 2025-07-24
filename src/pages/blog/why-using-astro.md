---
layout: ../../layouts/Frontmatter.astro
---

# Why I use Astro

The first selling point for me were the Islands, it simplified a lot when I wanted to do SSR with hydration or just SSR for mainly static content.
It comes with all the good parts offered by previous frameworks, like Next.js, Gatsby, Docusaurus having batteries included for almost every type of flow, image processing, markdown support, mdx support, static site generation, JSX, React support, endpoint creation by exporting a request in a `ts` file, you can even make SPA like bundles if you wish, so you can have "two" apps running with no big issue.

## Some projects

### Recicla CV

The projects I've worked with Astro is a website for a recycling company in my city Guadalajara where I've used the SSG feature, that I hosted in the customer's shared hosting with some custom `.htaccess` rules and for the backend I created separately a lambda that consumes a list of prices from the customer spreadsheet.

URL: https://reciclacv.com

### Tona.dev

This website I'm hosting in an AWS Lighstail instance with dokku and I'm runninng a custom GitHub action to deploy everytime I push to main. I decided to use Astro in order to just create `.md` or `.mdx` files and just type and create articles or previews.

### Curiontas.com

It's a website that display's motivational quotes and it's just a toy project to use Payload CMS and Astro working together, it uses an IntersectionObserver to load less images and it supports SSR for the content.

URL: https://curiontas.com

## Some caveats

### It's not possible to pass JSX as props.

The following code produces an error.

```jsx
<CardContainer header={<CardTitle />}>
```

## Handling Astro images and React, requires an specific structure.

If handling images and leveraging Astro the processing requires a composable pattern similar the one below.

```jsx
<CardContainer>
    <Image src={fullImportedImage}>
</CardContainer>
```
