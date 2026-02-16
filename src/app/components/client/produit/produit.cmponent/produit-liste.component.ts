import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../header.component/header.component';
import { FooterComponent } from '../../footer.component/footer.component';
import { Router } from '@angular/router';

export interface Product {
    id: number;
    nom: string;
    categorie: string;
    boutique: string;
    prix: number;
    prixOriginal?: number;
    quantite: number;
    image: string;
    rating: number;
    reviews: number;
    badges?: string[];
}

export interface FilterOption {
    label: string;
    value: string;
}

export interface Filter {
    categories: FilterOption[];
    selectedCategory: string;
    boutiques: FilterOption[];
    selectedBoutique: string;
    priceMin: number;
    priceMax: number;
}

@Component({
    selector: 'app-produit-liste',
    standalone: true,
    imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
    templateUrl: './produit-liste.component.html',
    styleUrls: ['./produit-liste.component.css']
})
export class ProduitListeComponent implements OnInit {
    products: Product[] = [
        {
            id: 1,
            nom: 'Phantom Run Pro X',
            categorie: 'Footwear',
            boutique: 'Aether Sports',
            prix: 129.99,
            quantite: 45,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALEMvbwwZgl7cwQmT9Rrx5H7dNtRbFPt8eNxy4uliMeMYo2--euzNQ3EZ4j7UWWCxMxTWc9t2Qwj8fmFAirNv41pGQlMKVF_jrU78PHjSHuX6Dkq9Tip46_XNiydFe3fye3Dj5giMztD4lpGuPzzdGdejXAND_09tVzZ2rUvggUXrby8jkZUHaUmBrywa1Za1ka3uzi41EmmUuakEiTudyzP9UQl_yRJPXsuCTl7jV_GGEjifmgLS2QJ17pIFHk_JHm5M5PLNwkFo',
            rating: 4.5,
            reviews: 124,
            badges: ['HOT']
        },
        {
            id: 2,
            nom: 'Minimalist Ceramic Watch',
            categorie: 'Accessories',
            boutique: 'Veloci Time',
            prix: 245.00,
            quantite: 28,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtfNz6Z-Qao_dU_184Xtce9Gf8M0rKXcjq-6W4XpFhuVfZaXzVsCR3JAZBQL2qlWHbgwgXo4GU5IzwaMQ3BDZ9tYKqL0DukDz30cq69_Sghk37S77bM0uykGP0yXYGr0d06DvALopn_5iDjFA4b7wPsQj3azY4yHYn-0yzmemWWykyIMXX0Iun2UZwsnPdqBs-rcEn1GzkZ1enLEdzhSPgpJyYGaronCj4ZJHzQvrqirKY9C-LBKUQeeijnWdoCdy_LOkd973tjYU',
            rating: 5,
            reviews: 86
        },
        {
            id: 3,
            nom: 'Ultra-Bass Wireless Headphones',
            categorie: 'Electronics',
            boutique: 'Sonic Luxe',
            prix: 199.00,
            prixOriginal: 249.00,
            quantite: 67,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHUfVhQwh9vcsyEQH_0YAJUffjgBFNAGASiGithTt0ezA8CvaadOt0tnCMRWx7P-QU-ocTgOPr7nRBQYy_i2vbtMoWfGSseRYtikbOCIRRVCo95v0mCGoa7agnicN1PWFIHR01dqfPQwh0OvlUlzDW84kI40hvcPlQojBWtA5sqY477cE30fLSmO4ZoAMO4oMZeLu_Nud1jIsnpF1wztz-rEZRq0TOkBHFL2OSIbELVnKkZm8NHa-B54MhG9as8SP3mYYuEC62s8Q',
            rating: 4,
            reviews: 312,
            badges: ['SAVE 20%']
        },
        {
            id: 4,
            nom: 'Connect+ Series 7 Smartwatch',
            categorie: 'Electronics',
            boutique: 'TechNova',
            prix: 399.00,
            quantite: 15,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMqtKl9QRBnbgJgtSjFbxYVhcKQ7gYL-uWxEftAlQjoNbm-C2WhOHFFYZzPzxLDNl4fCJ-wuRpvaYBESf1v4UfpEzLBcgn_YBcPotW4RzLcTqd3pBcrdVT2Aup6HXFj5z2Up58haxOYUrapvGxfcOqX2j-JfWmbn-u2SFj86RK8GdRQHZmMOHqeoRTGc8qF6q4tuWn5-0syJqW0ZmCh3jFNn5gaE6qBcLaYYpvY3FfHE66nPrHOW6XejJ1JQK-Hso5OjGsi69cAqw',
            rating: 4,
            reviews: 2400
        },
        {
            id: 5,
            nom: 'Crimson Speed Gaming Mouse',
            categorie: 'Electronics',
            boutique: 'Razer Edge',
            prix: 79.50,
            quantite: 92,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYOwiCnG0XcRF3gXun6BRJ-RFH18MoYAp8YotpAdcI8k-BA_pkhXp5Ejs4M3c6_1OS25K69D3W_qS_a6obJyBlRoRMsbBrOYmpeb02x_vvFzHH5AbFS_f0J76vwYCrHVsvpjb2XgIwGnvzziToIjHwq_Oc2hqkhk75OEQeWnTnLEm8u8iVklRQpgAWus5Kb4Un_o_gYU3FK6BU7SDqYx23T08bRcEuw1Xu4yBEjnFb09FQpYgNFkeYOJZclDCyGwBfs_HmXaU1Hc4',
            rating: 5,
            reviews: 1100
        },
        {
            id: 6,
            nom: 'Nocturne Polarized Shades',
            categorie: 'Accessories',
            boutique: 'Urban Peak',
            prix: 150.00,
            quantite: 33,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoq5WRTpGY30yaDwHSuxFAu3VzR5ePyq-F11PBtRAB4INDc5ySNPknyXcTVGLcEk6P62ufqFQIg7X3H-paJtxibwx5m0J7j8eiOwUU8ccom9jp94nGT6_q9IxNlHnrIAKvw6Kn9yV5tcE1MPIC-0W8IGAxAnLk2C1jxtGxf1qHfJ5-06G9YNkn8v3Q_7cW81HhF2sVVXO-AdjOWr_6NZ4ieXjT5q9UaKfQamo3Zdy-0paFJ8uQlaPaOp_r6pe-30mKautWe9uEX2E',
            rating: 3.5,
            reviews: 45
        }
    ];

    filteredProducts: Product[] = [];
    paginatedProducts: Product[] = [];

    filters: Filter = {
        categories: [
            { label: "Men's Fashion", value: 'mens' },
            { label: "Women's Fashion", value: 'womens' },
            { label: 'Accessories', value: 'accessories' },
            { label: 'Footwear', value: 'footwear' },
            { label: 'Electronics', value: 'electronics' }
        ],
        selectedCategory: '',
        boutiques: [
            { label: 'Aether Sports', value: 'aether' },
            { label: 'Urban Peak', value: 'urban' },
            { label: 'Veloci Time', value: 'veloci' },
            { label: 'TechNova', value: 'technova' },
            { label: 'Sonic Luxe', value: 'sonic' },
            { label: 'Razer Edge', value: 'razer' }
        ],
        selectedBoutique: '',
        priceMin: 0,
        priceMax: 850
    };

    searchTerm: string = '';
    sortBy: string = 'popular';
    currentPage: number = 1;
    totalPages: number = 1;
    itemsPerPage: number = 6;

    constructor(private router: Router) {}

    navigateTo(route: string) {
        this.router.navigate([route]);
    }

    ngOnInit() {
        this.applyFilters();
    }

    applyFilters() {
        // Ensure priceMin is not greater than priceMax
        if (this.filters.priceMin > this.filters.priceMax) {
            const temp = this.filters.priceMin;
            this.filters.priceMin = this.filters.priceMax;
            this.filters.priceMax = temp;
        }

        this.filteredProducts = this.products.filter(product => {
            // Filter by search term
            if (this.searchTerm && !product.nom.toLowerCase().includes(this.searchTerm.toLowerCase())) {
                return false;
            }

            // Filter by selected category
            if (this.filters.selectedCategory && product.categorie !== this.filters.selectedCategory) {
                return false;
            }

            // Filter by selected boutique
            if (this.filters.selectedBoutique && product.boutique !== this.filters.selectedBoutique) {
                return false;
            }

            // Filter by price range
            if (product.prix < this.filters.priceMin || product.prix > this.filters.priceMax) {
                return false;
            }

            return true;
        });

        // Calculate total pages
        this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);

        // Reset to first page if current page exceeds total pages
        if (this.currentPage > this.totalPages) {
            this.currentPage = 1;
        }

        // Update paginated products
        this.updatePaginatedProducts();
    }

    updatePaginatedProducts() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
    }

    clearFilters() {
        this.filters.selectedCategory = '';
        this.filters.selectedBoutique = '';
        this.filters.priceMin = 0;
        this.filters.priceMax = 850;
        this.searchTerm = '';
        this.applyFilters();
    }

    getStars(rating: number): { full: number; half: boolean; empty: number } {
        const full = Math.floor(rating);
        const half = rating % 1 !== 0;
        const empty = 5 - Math.ceil(rating);
        return { full, half, empty };
    }

    toggleFavorite(product: Product) {
        console.log('Toggle favorite:', product);
        // Implement favorite logic here
    }

    goToDetails(product: Product) {
        // Navigate to login page
        this.navigateTo('/client/produit/' + product.id);
        console.log('Go to details for:', product);
    }

    goToPage(page: number) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
            this.updatePaginatedProducts();
            // Scroll to top of product list
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    getPageNumbers(): number[] {
        const pages: number[] = [];
        const maxPagesToShow = 5;

        if (this.totalPages <= maxPagesToShow) {
            // Show all pages
            for (let i = 1; i <= this.totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Show first page, current page context, and last page
            pages.push(1);

            let start = Math.max(2, this.currentPage - 1);
            let end = Math.min(this.totalPages - 1, this.currentPage + 1);

            if (start > 2) {
                pages.push(-1); // -1 represents "..."
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (end < this.totalPages - 1) {
                pages.push(-1); // -1 represents "..."
            }

            if (this.totalPages > 1) {
                pages.push(this.totalPages);
            }
        }

        return pages;
    }
}
