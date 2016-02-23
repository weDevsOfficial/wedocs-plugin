<div class="wrap" id="wedocs-app">

    <h1><?php _e( 'Documentations', 'wedocs' ); ?></h1>

    <!-- <pre>@{{ $data | json }}</pre> -->

    <form action="" method="post" v-on:submit.prevent="addDoc">
        <input type="text" name="section-title" autocomplete="off" class="regular-text" v-model="newSection">
        <input type="submit" name="submit" class="button button-primary" value="Add Doc">
    </form>

    <span class="spinner is-active" style="float: none;"></span>

    <ul class="docs not-loaded" v-sortable>
        <li class="single-doc" v-for="doc in docs" data-id="{{ doc.post.id }}">
            <h3><a target="_blank" href="{{ editurl }}{{ doc.post.id }}">{{ doc.post.title }}</a> <span class="wedocs-btn-reorder">&#8801;</span></h3>

            <div class="inside">
                <ul class="sections" v-sortable>
                    <li v-for="section in doc.child" data-id="{{ section.post.id }}">
                        <span class="section-title" v-on:click="toggleCollapse">
                            <a target="_blank" href="{{ editurl }}{{section.post.id }}">{{ section.post.title }} <span v-if="section.child.length > 0" class="count">{{ section.child.length }}</span></a>

                            <span class="actions wedocs-row-actions">
                                <span class="wedocs-btn-reorder" title="<?php esc_attr_e( 'Re-order this section', 'wedocs' ); ?>">&#8801;</span>
                                <a target="_blank" href="{{ viewurl }}{{section.post.id }}" title="<?php esc_attr_e( 'Preview the doc', 'wedocs' ); ?>">#</a>
                                <span class="wedocs-btn-remove" v-on:click="removeSection(section, doc.child)" title="<?php esc_attr_e( 'Delete this section', 'wedocs' ); ?>">-</span>
                                <span class="add-article" v-on:click="addArticle(section)" title="<?php esc_attr_e( 'Add new article', 'wedocs' ); ?>">+</span>
                            </span>
                        </span>

                        <ul class="articles collapsed" v-if="section.child" v-sortable>
                            <li class="article" v-for="article in section.child" data-id="{{ article.post.id }}">
                                <a target="_blank" href="{{ editurl }}{{ article.post.id }}">{{ article.post.title }}<span v-if="article.post.status != 'publish'" class="doc-status">{{ article.post.status }}</span></a>

                                <span class="actions wedocs-row-actions">
                                    <span class="wedocs-btn-reorder">&#8801;</span>
                                    <a target="_blank" href="{{ viewurl }}{{article.post.id }}" title="<?php esc_attr_e( 'Preview the doc', 'wedocs' ); ?>">#</a>
                                    <span class="wedocs-btn-remove" v-on:click="removeArticle(article, section.child)">-</span>
                                </span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div class="add-section">
                <a class="button button-primary" href="#" v-on:click.prevent="addSection(doc)"><?php _e( 'Add Section', 'wedocs' ); ?></a>
            </div>
        </li>
    </ul>
</div>