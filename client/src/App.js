import React from 'react';
import {
  InstantSearch,
  SearchBox,
  Hits,
  SortBy,
  Panel,
  RefinementList
} from 'react-instantsearch-dom';
import './App.css';
import "instantsearch.css/themes/satellite.css";
import ResultTemplate from './components/ResultTemplate';

import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: 'typesenseHeadless', // Make sure to use an API key that only allows search operations
    nodes: [
      {
        host: 'localhost',
        port: '8108',
        protocol: 'http',
      },
    ],
    cacheSearchResultsForSeconds: 2 * 60, // Cache search results from server. Defaults to 2 minutes. Set to 0 to disable caching.
  },
  // following parameters are directly passed to Typesense's search API endpoint.
  additionalSearchParameters: {
    queryBy: 'title',
  },
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

const App = () => {
    return (
      <div className="ais-InstantSearch">
        <h1>Typesense Medusa Headless Integeration</h1>
        <InstantSearch indexName="products" searchClient={searchClient}>
         
          <div className="left-panel">
          <Panel header="Price">
              <SortBy
                items={[
                  { label: "Default", value: "products" },
                  {
                    label: "ranked (asc)",
                    value: "products/sort/price:asc",
                  },
                  {
                    label: "ranked (desc)",
                    value: "products/sort/price:desc",
                  },
                ]}
                defaultRefinement="products"
              />
            </Panel>
            <Panel header="categories">
              <RefinementList
                attribute="handle"
              />
            </Panel>
            <Panel header="Item Names">
              <RefinementList attribute="title" />
            </Panel>
            </div>
            <div className="right-panel">
            <SearchBox />
            <Hits hitComponent={ResultTemplate} />
          </div>
        </InstantSearch>
      </div>
    );
  }

export default App;
