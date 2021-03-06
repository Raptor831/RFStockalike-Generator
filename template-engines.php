<?php
/*
 * Template Name: Engines
 */
get_header(); the_post(); ?>

<?php $engines = wp_count_posts('engine'); ?>
<script>
 window.engineCount = <?php echo intVal($engines->publish); ?>;
</script>

<section id="content" class="full-width" ng-app="rfstockalike" ng-controller="rfEngineListController" ng-init="">

      <div class="container">

        <div class="main-content">

          <h1>Engine List</h1>

          <?php the_content(); ?>

          <div id="filters">
            <div class="filter">
              <label for="search">Name Search</label><input id="search" name="search" type="search" ng-model="search" ng-change="checkPage()"/>
            </div>
            <div class="filter">
              <label for="type">Engine Type</label>
              <select id="type" name="type" ng-model="type" ng-change="checkPage()">
                <option value="">-- All --</option>
                <option value="launch">Launch</option>
                <option value="launch-plus">Launch Plus</option>
                <option value="upper">Upper</option>
                <option value="upper-plus">Upper Plus</option>
                <option value="orbital">Orbital</option>
                <option value="nuclear-thermal">Nuclear Thermal</option>
                <option value="solid" selected="selected">Solid</option>
                <option value="solid-plus">Solid Plus</option>
                <option value="aerospike">Aerospike</option>
                <option value="jet">Jet</option>
              </select>
            </div>
            <div class="filter">
              <label for="mixture">Mixture</label>
              <select id="mixture" name="mixture" ng-model="mixSearch" ng-change="checkPage()">
                <option value="">-- All --</option>
                <option ng-repeat="mix in mixtures" value="{{mix.id}}">{{mix.title.rendered}}</option>
              </select>
            </div>
          </div>

          <div class="loading" ng-show="loading">Loading...</div>

          <nav>
            <button ng-disabled="currentPage == 0" ng-click="currentPage=currentPage-1">Previous</button>
            <span>{{currentPage+1}}/{{ceil(filteredEngines.length/pageSize)}}</span>
            <button ng-disabled="currentPage >= filteredEngines.length/pageSize - 1" ng-click="currentPage=currentPage+1">Next</button>
          </nav>

          <article ng-repeat="engine in filteredEngines = (engines | filter: { title: search, type: type, configs: mixSearch }) | startFrom:currentPage*pageSize | limitTo:pageSize">

            <h4><a href="{{engine.link}}"><span ng-bind-html="engine.title"></span></a></h4>

          </article>

          <nav>
            <button ng-disabled="currentPage == 0" ng-click="currentPage=currentPage-1">Previous</button>
            <span>{{currentPage+1}}/{{ceil(filteredEngines.length/pageSize)}}</span>
            <button ng-disabled="currentPage >= filteredEngines.length/pageSize - 1" ng-click="currentPage=currentPage+1">Next</button>
          </nav>

        </div><!-- end .main-content -->

        <?php //get_sidebar(); ?>

      </div><!-- end .container -->

    </section><!-- end #content -->

<?php get_footer(); ?>
