"use client"

import { useState } from "react"
import { StyleSheet, View, TouchableOpacity, TextInput, Alert } from "react-native"
import { Phone, Heart, Plus, Trash2, Edit2 } from "lucide-react-native"
import ThemedView from "./ThemedView"
import ThemedText from "./ThemedText"
import useThemeColor from "../hooks/useThemeColor"

export default function EmergencyContacts() {
  const [contacts, setContacts] = useState([
    { id: 1, name: "John Smith", relationship: "Spouse", phone: "(555) 123-4567" },
    { id: 2, name: "Dr. Emily Johnson", relationship: "Primary Doctor", phone: "(555) 987-6543" },
  ])
  const [isAddingContact, setIsAddingContact] = useState(false)
  const [editingContactId, setEditingContactId] = useState(null)
  const [newContactName, setNewContactName] = useState("")
  const [newContactRelationship, setNewContactRelationship] = useState("")
  const [newContactPhone, setNewContactPhone] = useState("")

  const primaryColor = useThemeColor({ light: "#3b82f6", dark: "#60a5fa" }, "tint")
  const subtleColor = useThemeColor({ light: "#64748b", dark: "#94a3b8" }, "text")
  const cardBgColor = useThemeColor({ light: "#ffffff", dark: "#1f2937" }, "background")
  const inputBgColor = useThemeColor({ light: "#f8fafc", dark: "#1e293b" }, "background")

  const handleAddContact = () => {
    if (!newContactName || !newContactPhone) {
      Alert.alert("Error", "Name and phone number are required")
      return
    }

    if (editingContactId) {
      // Update existing contact
      setContacts(
        contacts.map((contact) =>
          contact.id === editingContactId
            ? {
                ...contact,
                name: newContactName,
                relationship: newContactRelationship,
                phone: newContactPhone,
              }
            : contact,
        ),
      )
      setEditingContactId(null)
    } else {
      // Add new contact
      const newContact = {
        id: Date.now(),
        name: newContactName,
        relationship: newContactRelationship,
        phone: newContactPhone,
      }
      setContacts([...contacts, newContact])
    }

    // Reset form
    setNewContactName("")
    setNewContactRelationship("")
    setNewContactPhone("")
    setIsAddingContact(false)
  }

  const handleEditContact = (contact) => {
    setNewContactName(contact.name)
    setNewContactRelationship(contact.relationship)
    setNewContactPhone(contact.phone)
    setEditingContactId(contact.id)
    setIsAddingContact(true)
  }

  const handleDeleteContact = (contactId) => {
    Alert.alert("Delete Contact", "Are you sure you want to delete this emergency contact?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          setContacts(contacts.filter((contact) => contact.id !== contactId))
        },
        style: "destructive",
      },
    ])
  }

  const handleCancel = () => {
    setNewContactName("")
    setNewContactRelationship("")
    setNewContactPhone("")
    setEditingContactId(null)
    setIsAddingContact(false)
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor: cardBgColor }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Heart size={20} color={primaryColor} />
          <ThemedText style={styles.headerTitle}>Emergency Contacts</ThemedText>
        </View>
        {!isAddingContact && (
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: `${primaryColor}20` }]}
            onPress={() => setIsAddingContact(true)}
          >
            <Plus size={16} color={primaryColor} />
            <ThemedText style={[styles.addButtonText, { color: primaryColor }]}>Add</ThemedText>
          </TouchableOpacity>
        )}
      </View>

      {isAddingContact ? (
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <ThemedText style={styles.inputLabel}>Name</ThemedText>
            <TextInput
              style={[styles.input, { backgroundColor: inputBgColor, color: subtleColor }]}
              placeholder="Contact name"
              placeholderTextColor={subtleColor}
              value={newContactName}
              onChangeText={setNewContactName}
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.inputLabel}>Relationship</ThemedText>
            <TextInput
              style={[styles.input, { backgroundColor: inputBgColor, color: subtleColor }]}
              placeholder="Relationship (optional)"
              placeholderTextColor={subtleColor}
              value={newContactRelationship}
              onChangeText={setNewContactRelationship}
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.inputLabel}>Phone Number</ThemedText>
            <TextInput
              style={[styles.input, { backgroundColor: inputBgColor, color: subtleColor }]}
              placeholder="Phone number"
              placeholderTextColor={subtleColor}
              value={newContactPhone}
              onChangeText={setNewContactPhone}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.formButtons}>
            <TouchableOpacity style={[styles.cancelButton, { borderColor: subtleColor }]} onPress={handleCancel}>
              <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.saveButton, { backgroundColor: primaryColor }]} onPress={handleAddContact}>
              <ThemedText style={styles.saveButtonText} lightColor="#ffffff" darkColor="#ffffff">
                {editingContactId ? "Update" : "Save"}
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      ) : contacts.length > 0 ? (
        <View style={styles.contactsContainer}>
          {contacts.map((contact) => (
            <View key={contact.id} style={styles.contactItem}>
              <View style={styles.contactInfo}>
                <ThemedText style={styles.contactName}>{contact.name}</ThemedText>
                {contact.relationship && (
                  <ThemedText style={styles.contactRelationship} lightColor="#64748b" darkColor="#94a3b8">
                    {contact.relationship}
                  </ThemedText>
                )}
                <View style={styles.phoneContainer}>
                  <Phone size={14} color={subtleColor} style={styles.phoneIcon} />
                  <ThemedText style={styles.contactPhone} lightColor="#64748b" darkColor="#94a3b8">
                    {contact.phone}
                  </ThemedText>
                </View>
              </View>
              <View style={styles.contactActions}>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: `${primaryColor}20` }]}
                  onPress={() => handleEditContact(contact)}
                >
                  <Edit2 size={14} color={primaryColor} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: "#ef444420" }]}
                  onPress={() => handleDeleteContact(contact.id)}
                >
                  <Trash2 size={14} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <ThemedText style={styles.emptyText} lightColor="#64748b" darkColor="#94a3b8">
            No emergency contacts added yet
          </ThemedText>
        </View>
      )}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 4,
  },
  contactsContainer: {
    marginTop: 8,
  },
  contactItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 2,
  },
  contactRelationship: {
    fontSize: 13,
    marginBottom: 4,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  phoneIcon: {
    marginRight: 4,
  },
  contactPhone: {
    fontSize: 13,
  },
  contactActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  formContainer: {
    marginTop: 8,
  },
  inputContainer: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  formButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  cancelButton: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
  },
  cancelButtonText: {
    fontSize: 14,
  },
  saveButton: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  emptyContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
  },
})
