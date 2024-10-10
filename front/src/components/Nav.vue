<template>
    <nav
        class="navbar navbar-expand-sm navbar-primary bg-primary"
    >
        <div class="container">
            <a class="navbar-brand p-1 " href="/" >
                <img class=" rounded-4" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb4ltDheRYnJhBF-gjt0Im1Ajww44yoG2DsA&s" width="60" height="50">
            </a>
            <button
                class="navbar-toggler d-lg-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapsibleNavId"
                aria-controls="collapsibleNavId"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavId">
                <ul class="navbar-nav me-auto mt-2 mt-lg-0">
                    <li class="nav-item">
                    <RouterLink class="nav-link " to="/usuarios" aria-current="page" active-class="active"
                            exact-active-class="active">Usuarios
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link " to="/usuarios" aria-current="page" active-class="active"
                            exact-active-class="active">Productos
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/usuarios" aria-current="page" active-class="active"
                            exact-active-class="active">Pedidos
                        </RouterLink>
                    </li>

                </ul>
                
            </div>
        </div>
    </nav>
    
        
    
</template>