const app = new Vue({
    el: '#app',
    data() {
        return {
            message: 'Api Scrummer!',
            projects: [],
            inputSearch: '',
            pokemonArray: [],

        }
    },
    methods: {
        async getTasks() {
            const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.random(1,900)}`);
            const res = await data.json();
            if (res.sprites.other.dream_world.front_default) {
                this.projects.splice(0, 1, res);
            }
        },
        async getItems() {
            for (let index = 1; index < 900; index++) {
                const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`);
                const res = await data.json();
                if (res.sprites.other.dream_world.front_default) {
                    if (!this.pokemonArray.includes(res)) {
                        this.pokemonArray.push(res);
                    }
                }
            }
        },
        seeDetails(item) {
            this.inputSearch = '';
            this.projects.splice(0, 1, item);
        },

        random(min, max) {
            return Math.floor((Math.random() * (max - min + 1)) + min);
        },

        experienceLevel(index) {
            if (this.projects[index].base_experience < 100) {
                return 'red'
            } else if (this.projects[index].base_experience > 100 && this.projects[index].base_experience < 200) {
                return 'yellow'
            } else if (this.projects[index].base_experience > 200) {
                return '#31c231'
            }
        },

    },
    created() {
        this.getItems()
        this.getTasks()
        setInterval(() => {
            this.getTasks()
        }, 4000);
        console.log(this.pokemonArray);
    },
    computed: {
        filterItems() {
            return this.pokemonArray.filter(item => {
                return item.name.match(this.inputSearch.toLowerCase())
            })
        }
    }

})