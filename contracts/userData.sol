pragma solidity ^0.4.11;

/// @title Voting with delegation.
contract userdata {
    string name; 
    string company;
    string profession;

    address public creator;

    /// Create a new user
    function userdata(string _name, string _company, string _profession) {
        creator = msg.sender;
        name = _name;
        company = _company;
        profession = _profession;
    }

    /// get user
    function getname() constant returns (string) {
        return name;
    }
    function getcompany() constant returns (string) {
        return company;
    }
    function getprof() constant returns (string) {
        return profession;
    }
}