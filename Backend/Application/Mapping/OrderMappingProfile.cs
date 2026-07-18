using Application.Features.Order.GetMyOrders;
using Application.Features.Order.GetOrderById;
using AutoMapper;
using Domain.Entities;

namespace Application.Mapping;

public class OrderMappingProfile : Profile
{
    public OrderMappingProfile()
    {
        CreateMap<Order, OrderDto>();
        CreateMap<OrderItem, OrderItemDto>();
        CreateMap<Order, OrderDetailsDto>();

        CreateMap<OrderItem, OrderItemDetailsDto>();
    }
}
