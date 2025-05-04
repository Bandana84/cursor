from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, OtpToken
from .forms import CustomUserCreationForm, CustomUserChangeForm

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    
    # Specify which fields to display in the admin list view
    list_display = ('email', 'username', 'is_staff', 'is_active')
    list_filter = ('email', 'username', 'is_staff', 'is_active')
    
    # Define the fieldsets for add and change forms
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    
    # Fields to use when adding a new user
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )
    
    search_fields = ('email', 'username')
    ordering = ('email',)

@admin.register(OtpToken)
class OtpTokenAdmin(admin.ModelAdmin):
    list_display = ('user', 'otp_code', 'tp_created_at', 'otp_expires_at')
    search_fields = ('user__email', 'otp_code')
    list_filter = ('tp_created_at', 'otp_expires_at')