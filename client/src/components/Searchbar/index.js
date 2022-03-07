import React from "react";
import API from '../../utils/API';
import Autosuggest from 'react-autosuggest';

const theme = {
  container: {
    position: 'relative'
  },
  input: {
    width: 240,
    height: 30,
    padding: '10px 20px',
    fontFamily: 'Helvetica, sans-serif',
    fontWeight: 300,
    fontSize: 16,
    border: '1px solid #aaa',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  inputFocused: {
    outline: 'none'
  },
  inputOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  suggestionsContainer: {
    display: 'none'
  },
  suggestionsContainerOpen: {
    display: 'block',
    position: 'absolute',
    top: 51,
    width: 280,
    border: '1px solid #aaa',
    backgroundColor: '#fff',
    fontFamily: 'Helvetica, sans-serif',
    fontWeight: 300,
    fontSize: 16,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    zIndex: 2
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  suggestion: {
    cursor: 'pointer',
    padding: '10px 20px'
  },
  suggestionHighlighted: {
    backgroundColor: '#ddd'
  }
};

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      autocompleteResults: [],
      value: '',
      suggestions: []
    };
  }


  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  
    //Get auto complete result from API
    API.getAutocompleteResult(this.state.value).then((response) => {
      this.setState({
        autocompleteResults: response.data.results
      });
    }).catch((error) => {
      console.log(error);
    });

  };

  escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    const escapedValue = escapeRegexCharacters(value.trim());
  
    if (escapedValue === '') {
      return [];
    }
  
    const regex = new RegExp('^' + escapedValue, 'i');
  
    return inputLength === 0 ? [] : this.state.autocompleteResults.filter(lang =>
      regex.test(inputValue)/*lang.name.toLowerCase().slice(0, inputLength) === inputValue*/
    );
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
    //console.log("suggestions:", this.state.suggestions);
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (event, { suggestion, suggestionValue, index, method }) => {
    event.preventDefault();
    console.log('ping... ', suggestion)
    //const nameReplace = decodeURI(suggestion.name);
    //console.log('nameReplace=',nameReplace);
    window.location.href='/game/'+suggestion.name+'/'+suggestion.id;
    //event.preventDefault();
};

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Search game",
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        onSuggestionSelected={this.onSuggestionSelected}
        inputProps={inputProps}
        theme={theme}
      />
    );
  }
}

export default SearchBar;