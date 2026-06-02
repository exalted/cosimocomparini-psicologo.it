module.exports = {
  mode: 'jit',
  purge: [
    './**/*.html',
    // Section background/image utilities are referenced only through front
    // matter (e.g. `bg-color`, `image-style`), so JIT can't see them in the
    // templates. Scan the collection sources too, otherwise a build with no
    // pre-existing docs/ purges them (alternating backgrounds disappear and
    // `lg:w-4/6` images render full-width).
    './_home_sections/*.md',
    './_aree-di-intervento_sections/*.md',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
