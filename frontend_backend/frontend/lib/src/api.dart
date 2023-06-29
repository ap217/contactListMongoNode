import 'package:flutter/material.dart';
import 'dart:convert';
import 'dart:io';
import 'package:dio/dio.dart';
import 'package:equatable/equatable.dart';
import 'package:web_socket_channel/web_socket_channel.dart';

// ----------------------------------------------------------------------------
// Created this modal class for Contacts that store data comming json to dart.
// ----------------------------------------------------------------------------

class Contact extends Equatable {
  const Contact(this.id, this.name, this.email);

  final String id;
  final String name;
  final String email;

  factory Contact.fromJson(Map<String, dynamic> json) {
    final name = json['name'];
    final email = json['email'];
    final names = name.split(' ');

    return Contact(json['_id'], name, email);
  }

  @override
  List<String> get props => [id, name, email];
}

// ----------------------------------------------------------------------------
// REST API work that connect with backend and all the CRUD operation.
// ----------------------------------------------------------------------------

class ContactsRestApi {
  final _api = Dio(BaseOptions(
    baseUrl: 'http://localhost:8001/contacts/',
    headers: {
      'Content-Type': ContentType.json.mimeType,
    },
  ));

  Future<List<Contact>> getContacts() async {
    final res = await _api.get('');
    return (res.data['contacts/'] as List)
        .map<Contact>((json) => Contact.fromJson(json))
        .toList();
  }

  Future<Contact> addContact(String name, String email) async {
    final res = await _api.post('', data: {'name': name, 'email': email});
    return Contact.fromJson(res.data);
  }

  Future<Contact> updateContact(String id, String name, String email) async {
    final res = await _api.put(id, data: {'name': name, 'email': email});
    return Contact.fromJson(res.data);
  }

  Future deleteContact(String id) => _api.delete(id);
}
